import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useUserProfileStore from '../../store/userProfile'
import useAuthStore from '../../store/authStore'
import EditProfile from './EditProfile'
import useFollowUser from '../../hooks/useFollowUser'
import useChatStore from '../../store/chatStore'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import useShowToast from '../../hooks/useShowToast'
import { useNavigate } from 'react-router-dom'
import { firestore } from '../../firebase/firebase'

const ProfileHeader = () => {

    
    const {userProfile}=useUserProfileStore()
    const authUser=useAuthStore(state=>state.user)
    const visitingOwnProfileAndAuth= authUser && authUser.username===userProfile.username

    const visitingAnotherProfileAndAuth = authUser && authUser.username!==userProfile.username
    const {isOpen,onOpen,onClose}=useDisclosure()
    const {isFollowing,isUpdating,handleFollowUser}=useFollowUser(userProfile?.uid)
    
    const showToast=useShowToast();
    const navigate=useNavigate();

    
    const handleSelect = async () => {

        const userId=userProfile.uid;
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
            navigate('/chat');

        } catch (error) {
            console.error('Error fetching user details:', error);
            showToast('Error',error.messages, 'error');
        }
      };



  return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:'column',sm:'row'}}>
        <AvatarGroup size={{base:'xl',md:'2xl'}} justifySelf={'center'} alignItems={'flex-start'} mx={'auto'}>
            <Avatar src={userProfile.profilePicURL}  alt='profile logo'/>
        </AvatarGroup>
        <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>

            <Flex gap={4} direction={{base:'column',sm:'row'}} justifyContent={{base:'center',sm:'flex-start'}} alignItems={'center'} w={'full'}>


                <Text fontSize={{base:'sm',md:'lg'}}>
                   {userProfile.username}
                </Text>
                    { visitingOwnProfileAndAuth && (
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                        <Button bg={'white'} color={'black'} _hover={{bg:'white'}} size={{base:'xs',md:'sm'}} onClick={onOpen}>
                           Edit Profile
                        </Button> 
                   </Flex>

                    )}

                    { visitingAnotherProfileAndAuth && (
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                        <Button bg={'blue.500'} color={'white'} _hover={{bg:'blue.600'}} size={{base:'xs',md:'sm'}} onClick={handleFollowUser} isLoading={isUpdating}>
                           {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button> 
                        <Button bg={'blue.500'} color={'white'} _hover={{bg:'blue.600'}} size={{base:'xs',md:'sm'}} onClick={handleSelect} isLoading={isUpdating}>
                           Chat
                        </Button> 
                   </Flex>

                    )}
                

            </Flex>

            <Flex alignItems={'center'} gap={{base:2,sm:4}}>
                    <Text fontSize={{base:'xs',md:'sm'}}>
                        <Text as='span' fontWeight={'bold'}>{userProfile.posts.length}</Text>
                        Posts
                    </Text>
                    <Text fontSize={{base:'xs',md:'sm'}}>
                        <Text as='span' fontWeight={'bold'}>{userProfile.followers.length}</Text>
                        Followers
                    </Text>
                    <Text fontSize={{base:'xs',md:'sm'}}>
                        <Text as='span' fontWeight={'bold'}>{userProfile.following.length}</Text>
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile.fullName}</Text>
                </Flex>
                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} >          
                        {userProfile.bio}
                    </Text>
                </Flex>

                
        </VStack>

        {isOpen &&  <EditProfile isOpen={isOpen} onClose={onClose}/>}

    </Flex>
  )
}

export default ProfileHeader