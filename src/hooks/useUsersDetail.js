import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useUsersDetails = (userIds) => {
  const [usersDetails, setUsersDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersDetails = async () => {
      setLoading(true);
      try {
        const q = query(collection(firestore, 'users'), where('uid', 'in', userIds));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => doc.data());
        setUsersDetails(users);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userIds.length) {
      fetchUsersDetails();
    }
  }, [userIds]);

  return { usersDetails, loading };
};

export default useUsersDetails;
