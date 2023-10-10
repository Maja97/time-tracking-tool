import { db } from '@app/_firebase/firebase';
import { Tracker } from '@app/_types/Tracker';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useTrackers = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const fetchTrackers = async () => {
    try {
      const q = query(collection(db, 'trackers'), where('finished', '==', false));

      await getDocs(q).then((querySnapshot) => {
        console.log(querySnapshot.docs.map((doc) => ({ ...(doc.data() as Tracker), id: doc.id })));
        setTrackers(querySnapshot.docs.map((doc) => ({ ...(doc.data() as Tracker), id: doc.id })));
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    fetchTrackers();
  }, []);

  return { trackers, setTrackers };
};

export default useTrackers;
