// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB63uqdHbZFL6k5rkr9HYqkNiiNpdq7N8g',
  authDomain: 'devot-challenge.firebaseapp.com',
  projectId: 'devot-challenge',
  storageBucket: 'devot-challenge.appspot.com',
  messagingSenderId: '1068726912796',
  appId: '1:1068726912796:web:e2eebb4006ca5fea36dcd9',
  measurementId: 'G-30QXF4W06Q'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
