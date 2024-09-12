import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, Platform, StatusBar } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Header from '../Menu/Header'; // Adjust the path as necessary
import Footer from '../Menu/Footer'; // Adjust the path as necessary

const firebaseConfig = {
    apiKey: "AIzaSyDsmNjBPkjHmJlZi0RTW9FE59DZCFkBoBo",
    authDomain: "ujwellness-cb043.firebaseapp.com",
    projectId: "ujwellness-cb043",
    storageBucket: "ujwellness-cb043.appspot.com",
    messagingSenderId: "33750787509",
    appId: "1:33750787509:web:80f352a370f057a8c865fc"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const chatsRef = db.collection('chats');

export default function GroupChatApp() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedAnonymity = await AsyncStorage.getItem('anonymity');
        if (storedAnonymity !== null) {
          setIsAnonymous(JSON.parse(storedAnonymity));
        }
      } catch (error) {
        console.error('Failed to load anonymity setting:', error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messageFirestore = querySnapshot.docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
      appendMessages(messageFirestore);
    })
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback((messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, [messages]);

  async function readUser() {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }

  async function handleEnterChat() {
    const _id = Math.random().toString(36).substring(7);
    const displayName = isAnonymous ? 'Anonymous' : name;
    const user = { _id, name: displayName };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  async function handleSend(messages) {
    const writes = messages.map(m => chatsRef.add(m));
    await Promise.all(writes);
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Enter chat" onPress={handleEnterChat} />
        </View>
        <Footer />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <GiftedChat
        messages={messages}
        user={user}
        onSend={handleSend}
        style={styles.chat}
      />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    padding: 16,
  },
  inputText: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',
    marginBottom: 10,
  },
  chat: {
    flex: 1,
  },
});
