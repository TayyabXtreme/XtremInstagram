import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import {CommentLogo, NotificationsLogo, UnlikeLogo} from '../../assets/contants'
import usePostComment from '../../hooks/usePostComment'
import useAuthStore from '../../store/authStore'
import useLikePost from '../../hooks/useLikePost'
import { timeAgo } from '../../utils/timeAgo'
import CommentsModal from '../Modals/CommentModals'

const PostFooter = ({post,username,isProfilePage=false,creatorProfile}) => {

  const {isCommenting,handlePostComment}=usePostComment()
  const [comment,setComment]=useState('')
  const authUser=useAuthStore(state=>state.user)
  const {handleLikePost,isLiked,likes}=useLikePost(post)
  const commentRef=useRef(null)
  const {isOpen,onOpen,onClose}=useDisclosure()

  const handleSubmitComment=async()=>{
    await handlePostComment(post.id,comment)
    setComment('')

  }

  

  return (
   <>
   <Box mb={10} marginTop={'auto'}>
   <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
      <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
        {!isLiked ? (<NotificationsLogo/>) : (<UnlikeLogo/>)}
      </Box>
      <Box cursor={'pointer'} fontSize={18} onClick={()=>commentRef.current.focus()}>
        <CommentLogo/>
      </Box>
   </Flex>
   <Text fontWeight={600} fontSize={'sm'}>
       {likes} {likes === 1 ? 'like' : 'likes'}
   </Text>

   {
    isProfilePage && (
      <Text fontSize={12} color={'gray'}> 
        Posted {timeAgo(post.createdAt)}
      </Text>
    )
   }

      {!isProfilePage && (
        <>

            <Text fontSize='sm' fontWeight={700}>
                {creatorProfile?.username}{' '}
                <Text as='span' fontWeight={400}>
                {post.caption}
                </Text>
              </Text>
              {
                post.comments.length > 0 && (
                  <Text fontSize={12} color={'gray.500'} cursor={'pointer'}  onClick={onOpen}>
                    View all {post.comments.length} comments
                  </Text>
                )
              }
          {
            isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/>
          }
        </>
      )}

      {
        authUser && (

          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'} w={'full'}>

      <InputGroup>
        <Input variant={'flushed'} placeholder={'Add a comment...'} fontSize={14} value={comment} onChange={(e)=>setComment(e.target.value)} ref={commentRef}/>
        <InputRightElement>
          <Button
          fontSize={14}
          color={'blue.500'}
          fontWeight={600}
          cursor={'pointer'}
          _hover={{color:'white'}}
          bg={'transparent'}
          onClick={handleSubmitComment}
          isLoading={isCommenting}
          >
            Post</Button>
        </InputRightElement>
      </InputGroup>

    </Flex>


        )
      }

    
    </Box>



   </>
  )
}

export default PostFooter