import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { FeedPosts, SuggestedUsers } from '../../components'

const HomePage = () => {
  return (
    <Container maxW={'container.lg'}>
        <Flex gap={20}>
            <Box flex={2} py={10} >
              <FeedPosts/>
            </Box>
            <Box flex={3} mr={20} display={{base:'none',lg:'block'}} maxW={'300px'} >
              <SuggestedUsers />
            </Box>
        </Flex>
    </Container>
  )
}

export default HomePage