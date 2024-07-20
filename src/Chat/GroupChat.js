//@refresh reset
import React, { useState, useEffect, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDl7P0Us7pzI_3Awn23NlD-i9YPNJGXLR8",
  authDomain: "chatapp-dca8d.firebaseapp.com",
  projectId: "chatapp-dca8d",
  storageBucket: "chatapp-dca8d.appspot.com",
  messagingSenderId: "1053359782512",
  appId: "1:1053359782512:web:3f2d313d2277fa9b2c12b5"
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
    const user = { _id, name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  async function handleSend(messages) {
    const writes = messages.map(m => chatsRef.add(m));
    await Promise.all(writes);
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Button title="Enter chat" onPress={handleEnterChat} />
      </View>
    );
  }

  return (
    <GiftedChat messages={messages} user={user} onSend={handleSend} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',
    marginBottom: 10,
  },
});
