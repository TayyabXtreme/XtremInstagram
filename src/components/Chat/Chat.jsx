import React, { useEffect,useState } from 'react';
import { Flex, Box, Input, Button, VStack, Text, Avatar } from '@chakra-ui/react';
import useChatStore from '../../store/chatStore';
import { firestore } from '../../firebase/firebase';

import { arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import useAuthStore from '../../store/authStore';
import useGetUserByProfileId from '../../hooks/useGetUserByProfileId';

const Chat = () => {

    const displayDate = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        
        // Reset time portion to compare only the date
        today.setHours(0, 0, 0, 0);
        messageDate.setHours(0, 0, 0, 0);
        
        // Check if the date is not today
        if (messageDate.getTime() !== today.getTime()) {
            return messageDate.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
        } else {
            return timestamp.slice(10)
        }
    };
    

    const { messages, addMessage } = useChatStore();
  const [inputMessage, setInputMessage] = useState('');
  const authUser=useAuthStore(state=>state.user);



   // Only subscribe once when component mounts

//useEffect to update realtime data base 

useEffect(() => {
    if(messages.user1 === undefined || messages.user2 === undefined) return;
    if(!messages.user1 || !messages.user2) return;

    const combinedId = messages.user1 > messages.user2 ? messages.user1 + messages.user2 : messages.user2 + messages.user1;
    
    const docRef = doc(firestore, 'chats', combinedId);
   
    const unsubscribe = onSnapshot(docRef, (doc) => {
        useChatStore.getState().setMessages(doc.data());
    }
    );
    return () => unsubscribe();
}, [messages.user1, messages.user2]);

useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'messages'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                addMessage(change.doc.data());
            }
        });
    });

    return () => unsubscribe(); 
}, []);



const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    try {
        // Create a combined chat ID based on user IDs
        const combinedId = messages.user1 > messages.user2 ? messages.user1 + messages.user2 : messages.user2 + messages.user1;
        const docRef = doc(firestore, 'chats', combinedId);

        // Update Firestore document with new message
        const obj = {
            messages: arrayUnion({
                text: inputMessage,
                user: authUser.uid,
                timestamp: new Date(),
            }),
        };
        await updateDoc(docRef, obj);
        // const res = await getDoc(doc(firestore, 'chats', combinedId));
         
        //     useChatStore.getState().setMessages(res.data());
        
        setInputMessage('');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

const {userProfile,isLoading}=useGetUserByProfileId(authUser.uid !== messages.user1 ? messages.user1 : messages.user2)

    if(isLoading || userProfile===undefined || userProfile===null){
        return <Flex flex={4} >

        </Flex>
    }


// Display loading text while messages are being fetched
if(messages!==undefined && messages.messages===undefined){
if (messages.length === 0) {
    return <Text flex={4}></Text>;
}}

return (
    <Flex flex={4} flexDir="column" height="100vh" mx="auto" p={4}>
        <Box display="flex" alignItems="center" bg="gray.900" color="white" p={4} borderRadius="md">
            {
                isLoading && userProfile!==undefined  ? <div>Loading...</div> :(
                    <>
                 <Avatar src={userProfile.profilePicURL} size="md" ml={3} />
            <Text ml={5} fontWeight="bold">{userProfile.username}</Text> 
            </>
                )
            }
            
        </Box>

        <Flex flex={1} flexDir="column" overflowY="auto" p={4} my={2} bg="" borderRadius="md">
            <VStack align="start" spacing={3}>
            {messages.messages.map((message, index) => (
    <Box key={index} >
        {
            message.user === authUser.uid ? (
                <Box bg="green.400" p={3} borderRadius="md" shadow="md" ml="auto">
                    <Text>{message.text}</Text>
                    <Text fontSize="xs" color="gray.500">
                        {displayDate(new Date(message.timestamp?.toDate()).toLocaleString())}
                    </Text>
                </Box>
            ) : (
                <Box bg="gray.600" p={3} borderRadius="md" shadow="md">
                    <Text>{message.text}</Text>
                    <Text fontSize="xs" color="gray.500">
                        {displayDate(new Date(message.timestamp?.toDate()).toLocaleString())}
                    </Text>
                </Box>
            )
        }
    </Box>
))}

            </VStack>
        </Flex>

        <Flex mt={2}>
            <Input  
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            }}
            placeholder="Type your message..." mr={2} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <Button colorScheme="teal" onClick={sendMessage}>Send</Button>
        </Flex>
    </Flex>
);

};

export default Chat;
