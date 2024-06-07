import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase';

const PasswordResetScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { userEmail } = route.params;
  

  useState(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const sendResetEmail = async () => {
    setLoading(true);
    try {
      if (!email || !validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      const usersCollection = collection(db, 'Students');
      const usersQuery = query(usersCollection, where('email', '==', email));
      const usersSnapshot = await getDocs(usersQuery);

      const therapistCollection = collection(db, 'Therapist');
      const therapistQuery = query(therapistCollection, where('email', '==', email));
      const therapistSnapshot = await getDocs(therapistQuery);

      if (usersSnapshot.empty && therapistSnapshot.empty) {
        setError('Email does not exist');
        setTimeout(() => setError(''), 6000)
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setIsResetEmailSent(true);
    } catch (error) {
      setError('Error sending reset email, please try again');
      setTimeout(() => setError(''), 6000)
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (inputText) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(inputText.trim());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Reset</Text>
      <Text style={styles.instructions}>
        Enter your email address to reset your password.
      </Text>
      {isResetEmailSent ? (
        <Text style={styles.successMessage}>
          Password reset instructions sent to your email.
        </Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

      {loading && <ActivityIndicator size="large" color="gray" />}

          <TouchableOpacity
            style={styles.button}
            onPress={sendResetEmail}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "orange"
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  instructions: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 13,
  },
});

export default PasswordResetScreen;
