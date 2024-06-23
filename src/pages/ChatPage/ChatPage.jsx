import React from 'react'
import ChatSideBar from '../../components/Chat/ChatSideBar'
import Chat from '../../components/Chat/Chat'
import { Flex } from '@chakra-ui/react'

const ChatPage = () => {
  return (
    <>
    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
    <ChatSideBar/>
    <Chat/>
    </Flex>
    </>
  )
}

export default ChatPage