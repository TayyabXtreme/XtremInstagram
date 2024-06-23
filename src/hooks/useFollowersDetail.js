import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { firestore } from '../firebase/firebase';

const useFollowersDetails = (myUserId) => {
  const [followersDetails, setFollowersDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowersDetails = async () => {
      setLoading(true);
      try {
        const usersCollection = collection(firestore, 'users');
        const q = query(usersCollection, where('following', 'array-contains', myUserId));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => doc.data());
        setFollowersDetails(users);
      } catch (error) {
        console.error('Error fetching followers details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (myUserId) {
      fetchFollowersDetails();
    }
  }, [myUserId]);

  return { followersDetails, loading };
};

export default useFollowersDetails;
