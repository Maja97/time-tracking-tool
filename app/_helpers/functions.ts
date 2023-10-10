import { Pause } from '@app/_types/Tracker';
import { differenceInSeconds } from 'date-fns';

export const secondsToTimeFormat = (seconds: number) =>
  new Date(seconds * 1000).toISOString().slice(11, 19);

export const subtractPausesFromDuration = (startTime: Date, pauses: Pause[], paused: boolean) => {
  const today = new Date();
  let pauseSeconds = 0;
  let lastStopTime: Date;

  lastStopTime = paused
    ? pauses?.find((pause) => pause.endTime === null)?.startTime || today
    : today;

  pauseSeconds = pauses
    ?.filter((pause) => pause.endTime !== null)
    .reduce((acc, curr) => {
      if (curr.endTime) return acc + differenceInSeconds(curr.endTime, curr.startTime);
      return acc;
    }, 0);

  return differenceInSeconds(lastStopTime, startTime) - pauseSeconds;
};
