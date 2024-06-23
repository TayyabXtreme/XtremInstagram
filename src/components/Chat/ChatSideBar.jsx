import { Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import Users from './Users'

const ChatSideBar = () => {
  return (
    <Flex flex={1} display={{sm:'none',md:'flex',base:'none'}} height={'100vh'} background={'gray.900'} borderRadius={5} borderLeftRadius={0} flexDirection={'column'}>
        <NavBar />
        <Flex display={'flex'} alignItems={'center'} height={'3vh'}  w={'full'} background={'black'} border={'1px solid'} borderColor={'whiteAlpha.300'} borderRadius={5} borderLeftRadius={0} />
        <Users/>
    </Flex>
  )
}

export default ChatSideBar