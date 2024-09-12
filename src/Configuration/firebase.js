
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAerJ_l7al-jGYOv-9_6xxXOkBN-RuJp9E",
  authDomain: "ujwellness-be148.firebaseapp.com",
  projectId: "ujwellness-be148",
  storageBucket: "ujwellness-be148.appspot.com",
  messagingSenderId: "45141591962",
  appId: "1:45141591962:web:33783cec3426b260f39c23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, db, storage };
