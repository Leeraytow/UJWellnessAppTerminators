import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../Configuration/firebase'; // Make sure the path to firebase configuration is correct
import { useNavigation } from '@react-navigation/native';

const SignOut = () => {
  const navigation = useNavigation();

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
                navigation.replace('Login'); // Redirect to the Login screen after sign out
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
      <Text style={styles.header}>Sign Out</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Sign Out Button</Text>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Confirmation Prompt</Text>
        <Text>Ensure the user wants to sign out with a confirmation message.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  signOutButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignOut;
