import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { FeedPosts, SuggestedUsers } from '../../components'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'

const HomePage = () => {
  const {isLoading,posts}=useGetFeedPosts()
  return (
    <Container maxW={'container.lg'}>
        <Flex gap={20}>
          {
            !isLoading && posts.length !== 0 ? (
              <>
              <Box flex={2} py={10} >
              <FeedPosts/>
            </Box>
            <Box flex={3} mr={20} display={{base:'none',lg:'block'}} maxW={'300px'} >
            <SuggestedUsers />
          </Box>
          </>
            ) :(<Box flex={3} mr={20}  maxW={'300px'} >
              <SuggestedUsers />
            </Box>)
          }
            
            
        </Flex>
    </Container>
  )
}

export default HomePage