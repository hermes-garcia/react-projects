import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAEE7JHsaNK8Qs-Lr7m2urxs8e-86Rn6Xc",
    authDomain: "react-examples-cbe44.firebaseapp.com",
    projectId: "react-examples-cbe44",
    storageBucket: "react-examples-cbe44.appspot.com",
    messagingSenderId: "516147076576",
    appId: "1:516147076576:web:6378343bd278c5877b5f85"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth =  getAuth(FirebaseApp);
export const FirebaseDB =  getFirestore(FirebaseApp);