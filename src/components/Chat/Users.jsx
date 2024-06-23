import { Avatar, Box, Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import useAuthStore from '../../store/authStore'
import useFollowersDetails from '../../hooks/useFollowersDetail';
import { firestore } from '../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useChatStore from '../../store/chatStore';

const Users = () => {
    const authUser=useAuthStore(state=>state.user);
    


    const {followersDetails,isLoading}=useFollowersDetails(authUser.uid);


    const showToast=useToast();
    
    if(isLoading){
        return <div>Loading...</div>
    }

    const handleSelect = async (userId) => {
        const combinedId = authUser.uid > userId ? authUser.uid + userId : userId + authUser.uid;
       
      
        try {
          const res = await getDoc(doc(firestore, 'chats', combinedId));
          if (res.exists()) {
            useChatStore.getState().setMessages(res.data());
            // console.log(res.data());
          } else {
           const res= await setDoc(doc(firestore, 'chats', combinedId), {
                user1: authUser.uid,
                user2: userId,
                messages: [],
              });
              const res1 = await getDoc(doc(firestore, 'chats', combinedId));
              if (res1.exists()) {
                useChatStore.getState().setMessages(res1.data());
              }
              
          }
        } catch (error) {
            console.error('Error fetching user details:', error);
            showToast('Error',error.messages, 'error');
        }
      };
      if(followersDetails.length===0){
        return(
          <>
          <h1 style={{textAlign:'center'}}>No one follow you🙂</h1>

          </>
        )

      }


    
  return (  
    <Flex flexDir={'column'}>

        {
            
           isLoading ? <div>Loading...</div> : followersDetails.map(user=>(
            <Box onClick={()=>handleSelect(user.uid)} key={user.uid}  display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={2}  borderBottom={'1px solid'} borderColor={'whiteAlpha.500'} _hover={{background:'black'}} cursor={'pointer'}>
                <Box display={'flex'} alignItems={'center'}>
                    <Avatar src={user.profilePicURL} size={'md'} ml={3}/>
                    <Box ml={3}>{user.username}</Box>
                </Box>
               
            </Box>
           ))
        }
       
    </Flex>
  )
}

export default Users