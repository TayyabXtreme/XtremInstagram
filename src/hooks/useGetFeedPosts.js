import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useShowToast from './useShowToast'
import useUserProfileStore from '../store/userProfile'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/authStore'

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {posts, setPosts} = usePostStore()
    const authUser = useAuthStore((state) => state.user)
    const showToast=useShowToast();
    const {setUserProfile}=useUserProfileStore()


    useEffect(()=>{
        const getFeedPosts=async()=>{
            setIsLoading(true)
            if(authUser.following.length===0){
                setIsLoading(false)
                setPosts([])
                return 
            }
            const q=query(collection(firestore,'posts'),where('createdBy','in',authUser.following))
            try{
                const querySnapshot=await getDocs(q)
                const feedPost=[]
                querySnapshot.forEach(doc=>{
                    feedPost.push({id:doc.id,...doc.data()})
                })

                feedPost.sort((a,b)=>b.createdAt-a.createdAt)
                setPosts(feedPost)
            }
            catch(error){
                showToast('Error',error.message,'error')
            }
            finally{
                setIsLoading(false)
            }
        }
        if(authUser){
            getFeedPosts()
        }

    },[authUser,setPosts,setUserProfile])
  
    return {isLoading,posts}

}

export default useGetFeedPosts