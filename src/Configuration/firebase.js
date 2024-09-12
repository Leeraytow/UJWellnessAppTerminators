
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDsmNjBPkjHmJlZi0RTW9FE59DZCFkBoBo",
  authDomain: "ujwellness-cb043.firebaseapp.com",
  projectId: "ujwellness-cb043",
  storageBucket: "ujwellness-cb043.appspot.com",
  messagingSenderId: "33750787509",
  appId: "1:33750787509:web:80f352a370f057a8c865fc"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(app);

export { auth, db, storage };
