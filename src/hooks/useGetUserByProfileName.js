import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfile';

const useGetUserByProfileName = (username) => {
  const [isLoading,setIsLoading]=useState(true);
  const showToast=useShowToast();
   const {userProfile,setUserProfile} =useUserProfileStore()


  useEffect(()=>{
    const getUserProfile=async()=>{
        setIsLoading(true)
        try{
            const q=query(collection(firestore,'users'),where('username','==',username))
            const querySnaphot= await getDocs(q)

            if(querySnaphot.empty){
          
                return setUserProfile(null)
            }
            let userDoc;
            querySnaphot.forEach((doc)=>{
                userDoc=doc.data()
            })

            setUserProfile(userDoc);
        
        }
        catch(error){
            showToast("Error",error.message,"error")
        }
        finally{
            setIsLoading(false)
        }


    }
    getUserProfile();

  },[setUserProfile,username])
  return {isLoading,userProfile};
}

export default useGetUserByProfileName