import { trackersCollectionName } from '@app/_consts/consts';
import cookieKeys from '@app/_consts/cookies';
import { db } from '@app/_firebase/firebase';
import { FirebaseTracker, Pause, Tracker } from '@app/_types/Tracker';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useCookies } from 'next-client-cookies';
import { useCallback, useEffect, useState } from 'react';

const useHistoryTrackers = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [isLoading, setLoading] = useState(true);

  const cookies = useCookies();

  const fetchTrackers = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, trackersCollectionName),
        where('finished', '==', true),
        where('userId', '==', cookies.get(cookieKeys.TOKEN)),
        orderBy('startTime', 'desc')
      );

      await getDocs(q).then((querySnapshot) => {
        const trackersData = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as FirebaseTracker),
          id: doc.id
        }));

        const mapped = trackersData.map((item) => {
          const mappedPauses: Pause[] = item.pauses?.map((pause) => {
            const start = new Date(0);
            start.setUTCSeconds(pause?.startTime.seconds);

            const end = new Date(0);
            if (pause.endTime) end.setUTCSeconds(pause.endTime.seconds);

            return {
              startTime: start,
              endTime: pause.endTime !== null ? end : null
            };
          });

          const start = new Date(0);
          start.setUTCSeconds(item?.startTime.seconds);
          const end = new Date(0);
          if (item.endTime) end.setUTCSeconds(item?.endTime.seconds);

          return {
            ...item,
            pauses: mappedPauses,
            startTime: start,
            endTime: item.endTime !== null ? end : null
          };
        });

        setTrackers(mapped);
        setLoading(false);
      });
    } catch (e) {
      console.log('error', e);
    }
  }, [cookies]);

  useEffect(() => {
    fetchTrackers();
  }, [fetchTrackers]);

  return { trackers, setTrackers, isLoading };
};

export default useHistoryTrackers;
