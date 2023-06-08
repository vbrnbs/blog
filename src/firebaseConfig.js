import React from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
  // apiKey: REACT_APP_API_KEY,
  // apiKey: "AIzaSyDHAHVbw4Ox3sDnQe-DEDD7q2Qu9SiBMS4",
  authDomain: "daysblog.firebaseapp.com",
  projectId: "daysblog",
  storageBucket: "daysblog.appspot.com",
  messagingSenderId: "713828111503",
  appId: "1:713828111503:web:e1ec769b24948fd1a84cfa",
  measurementId: "G-QWZ7S1400N"
};

export const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const db = getFirestore(app);
// export const auth = getAuth(app);
export const auth = getAuth();
auth.setPersistence(browserLocalPersistence)



// auth https://www.youtube.com/watch?v=9bXhf_TELP4&t=714s
