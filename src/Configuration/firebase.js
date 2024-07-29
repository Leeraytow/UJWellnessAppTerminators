
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, db, storage };
