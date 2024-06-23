import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import { useState } from 'react';
import useAuthStore from '../store/authStore';

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const [customError, setCustomError] = useState(null);
    const loginUser=useAuthStore(state=>state.login)


    const signup = async (input) => {
        if (!input.email || !input.password || !input.username || !input.fullName) {
            showToast('Error', 'Please fill all the fields', 'error');
            return;
        }

        const usersRef=collection(firestore,'users');
        const q=query(usersRef,where('username','==',input.username));
        const querySnapshot=await getDocs(q);

        if(!querySnapshot.empty){
            
            showToast('Error','Username already taken','error');
            return;
        
        }


        try {
            const newUser = await createUserWithEmailAndPassword(input.email, input.password);
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: input.email,
                    username: input.username,
                    fullName: input.fullName,
                    bio: '',
                    profilePicURL: './pic.jpeg',
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                    password: input.password,
                };
                await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                loginUser(userDoc);
                showToast('Success', 'Account created successfully', 'success');
            }
        } catch (error) {
            setCustomError(error);
            showToast('Error', error.message, 'error');
        }
    };

    return { loading, error: customError || error, signup };
};

export default useSignUpWithEmailAndPassword;
