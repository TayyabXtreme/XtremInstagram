import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useAuthStore from '../../store/authStore'

const NavBar = () => {
    const authUser=useAuthStore(state=>state.user)
    
  return (
    <Flex display={'flex'} alignItems={'center'} height={'10vh'}  w={'full'} background={'black'} border={'1px solid'} borderColor={'whiteAlpha.300'} borderRadius={5} borderLeftRadius={0} >
        <Avatar src={authUser.profilePicURL} size={'sm'} ml={3}/>
        <Box ml={3} fontWeight={'bold'}>{authUser.username}   </Box>
        
    </Flex>
  )
}

export default NavBar