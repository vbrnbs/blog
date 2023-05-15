import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: "daysblog.firebaseapp.com",
  projectId: "daysblog",
  storageBucket: "daysblog.appspot.com",
  messagingSenderId: "713828111503",
  appId: "1:713828111503:web:e1ec769b24948fd1a84cfa",
  measurementId: "G-QWZ7S1400N"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
// export const auth = getAuth(app);


// auth https://www.youtube.com/watch?v=9bXhf_TELP4&t=714s
