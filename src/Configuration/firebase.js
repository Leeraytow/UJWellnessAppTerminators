// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAIwAIJEXRa38LgiJPUJth1wbTSw5hB0ZM",
  authDomain: "ujwellness-5b386.firebaseapp.com",
  projectId: "ujwellness-5b386",
  storageBucket: "ujwellness-5b386.appspot.com",
  messagingSenderId: "720562431915",
  appId: "1:720562431915:web:8ce7d19d3e48dd20e614ee",
  measurementId: "G-0GCRT1580X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth();

export { auth, db };

