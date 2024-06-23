import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { get } from 'firebase/database';

const useGetUserByProfileId = (userId) => {
   const [isLoading, setIsLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(null)
    const showToast=useShowToast();


    useEffect(()=>{
        const getUserProfile=async()=>{
            setIsLoading(true)
            try{
                const userRef=await getDoc(doc(firestore,'users',userId));
                if(userRef.exists()){
                    setUserProfile(userRef.data())
                }



            }
            catch(error){
                showToast('Error',error.message,'error')
            }
            finally{
                setIsLoading(false)
            }
        }   
        getUserProfile()

    },[setUserProfile,userId])


    return {isLoading,userProfile,setUserProfile}



}

export default useGetUserByProfileId