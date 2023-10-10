import { Timestamp } from 'firebase/firestore';

interface BaseTracker {
  id: string;
  userId: string;
  paused: boolean;
  finished: boolean;
  duration: number;
  description: string;
}

export interface Pause extends Time {}
export interface FirebasePause extends FirebaseTime {}

interface Time {
  startTime: Date;
  endTime: Date | null;
}

interface FirebaseTime {
  startTime: Timestamp;
  endTime: Timestamp | null;
}

export interface Tracker extends Time, BaseTracker {
  pauses: Pause[];
}

export interface FirebaseTracker extends FirebaseTime, BaseTracker {
  pauses: FirebasePause[];
}
