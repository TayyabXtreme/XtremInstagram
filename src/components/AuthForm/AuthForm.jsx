import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React,{useState} from 'react'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'


const AuthForm = () => {

    const [isLogin, setIsLogin] = useState(true)

  return (
    <>
        <Box border={'1px solid gray'} borderRadius={4} padding={5}>

            <VStack>

                <Image src={'/logo.png'} alt={'instagram-logo'} h={10} />

                {isLogin ? <Login /> : <Signup />}

                                    {/* OR Text */}

                <Flex justifyContent={'center'} alignItems={'center'}  my={4} gap={2} w={'full'}>

                    <Box flex={2} h={'1px'} bg={'gray.400'} />
                    <Text mx={1} color={'white'}>OR</Text>
                    <Box flex={2} h={'1px'} bg={'gray.400'} />
                
                </Flex>

                                <GoogleAuth prefix={isLogin ? 'Log in' : 'Sign up'} />

            </VStack>

        </Box>

        <Box border={'1px solid gray'} borderRadius={4} padding={5}>

            <Flex alignItems={'center'} justifyContent={'center'}>

                <Box mx={2} fontSize={14} >

                {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}

                </Box>

                <Box onClick={()=>setIsLogin(prev=>!prev)} cursor={'pointer'} color={'blue.500'}>

                    {isLogin ? "Sign Up" : "Login"}

                </Box>

            </Flex>

        </Box>

    </>
  )
}

export default AuthForm