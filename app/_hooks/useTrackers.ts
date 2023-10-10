import cookieKeys from '@app/_consts/cookies';
import { db } from '@app/_firebase/firebase';
import { subtractPausesFromDuration } from '@app/_helpers/functions';
import { FirebaseTracker, Pause, Tracker } from '@app/_types/Tracker';
import { trackersCollectionName } from '@app/_consts/consts';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useCookies } from 'next-client-cookies';
import { useCallback, useEffect, useRef, useState } from 'react';

const useTrackers = () => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [activeDuration, setActiveDuration] = useState<number>();
  const [isLoading, setLoading] = useState(true);

  const time = useRef<ReturnType<typeof setInterval>>();

  const cookies = useCookies();

  const fetchTrackers = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, trackersCollectionName),
        where('finished', '==', false),
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

          const calculatedDuration = subtractPausesFromDuration(start, mappedPauses, item.paused);

          return {
            ...item,
            pauses: mappedPauses,
            duration: calculatedDuration,
            startTime: new Date(item?.startTime.seconds),
            endTime: item.endTime !== null ? new Date(item.endTime.seconds) : null
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

  useEffect(() => {
    const activeTimerDuration = trackers.find((tracker) => !tracker.paused)?.duration;
    if (activeTimerDuration !== undefined) {
      time.current = setInterval(() => {
        setActiveDuration((prev) => {
          return (prev || activeTimerDuration) + 1;
        });
      }, 1000);
    }
    return () => clearInterval(time.current);
  }, [trackers]);

  const clearActiveInterval = () => {
    clearInterval(time.current);
    setActiveDuration(undefined);
  };

  return { trackers, setTrackers, activeDuration, clearActiveInterval, isLoading };
};

export default useTrackers;
