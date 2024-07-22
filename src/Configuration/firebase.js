// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDsmNjBPkjHmJlZi0RTW9FE59DZCFkBoBo",
  authDomain: "ujwellness-cb043.firebaseapp.com",
  projectId: "ujwellness-cb043",
  storageBucket: "ujwellness-cb043.appspot.com",
  messagingSenderId: "33750787509",
  appId: "1:33750787509:web:80f352a370f057a8c865fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

export { auth, db };

