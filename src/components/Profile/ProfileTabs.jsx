import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsBookmark, BsGrid3X3Gap, BsSuitHeart } from 'react-icons/bs'

const ProfileTabs = () => {
  return (
    <Flex w={'full'} justifyContent={'center'} gap={{base:4,sm:10}} textTransform={'uppercase'} fontWeight={'bold'}>
        <Flex borderTop={'1px solid white'} alignItems={'center'} p='3' gap={3} cursor={'pointer'}>
            <Box>
                <BsGrid3X3Gap/>
            </Box>
            <Text fontSize={12} display={{base:'none',sm:'block'}}>Posts</Text>
        </Flex>
        <Flex  alignItems={'center'} p='3' gap={3} cursor={'pointer'}>
            <Box>
                <BsBookmark/>
            </Box>
            <Text fontSize={12} display={{base:'none',sm:'block'}}>Saved</Text>
        </Flex>
        <Flex alignItems={'center'} p='3' gap={3} cursor={'pointer'}>
            <Box>
                <BsSuitHeart fontWeight={'bold'} />
            </Box>
            <Text fontSize={12} display={{base:'none',sm:'block'}}>Likes</Text>
        </Flex>
    </Flex>
  )
}

export default ProfileTabs