import React from 'react'
import {Box, Container, Flex, Image, VStack} from '@chakra-ui/react'
import { AuthForm } from '../../components'

const AuthPage = () => {
  return (
   <Flex minH={"100vh"} justifyContent={'center'} alignItems={'center'} px={4}>

        <Container maxW={'container.md'} padding={0}>
            <Flex  justifyContent={'center'} alignItems={'center'} gap={10}>
            {/* Left Hand Side */}

                <Box display={{base:'none',md:'block'}} flex={1}>

                    <Image src={'/auth.png'} alt={'phone-image'}  h={650} />

                </Box>

                {/* Right Hand Side */}

                <VStack spacing={4} align={"stretch"}>

                    <AuthForm/>

                    <Box textAlign={'center'}>
                        Get the app.
                    </Box>

                    <Flex gap={5} justifyContent={'center'}>

                        <Image src={'/playstore.png'} alt={'play store logo'} h={10} />
                        <Image src={'/microsoft.png'} alt={'microsoft logo'} h={10} />

                    </Flex>

                </VStack>
            </Flex>
        </Container>

   </Flex>
  )
}

export default AuthPage