import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc,deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../src/Configuration/firebase'
import { signOut, deleteUser } from 'firebase/auth';

export default function ChatScreen({navigation}) {
  const handleSignOut = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => {
            signOut(auth)
              .then(() => {
                console.log('User signed out');
                navigation.replace('StudentLogin'); // Redirect to the Login screen after sign out
              })
              .catch(error => {
                console.error('Error signing out: ', error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Pressable style={styles.signOut} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  signOut: {
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
