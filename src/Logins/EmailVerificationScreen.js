import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../Configuration/firebase';

const EmailVerificationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userEmail, userName, uid } = route.params;

  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(30); 
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      sendVerificationEmail();
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad && countdown > 0) {
      startCountdown();
    }
  }, [countdown]);

  const sendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setLoading(false);
        Alert.alert('Verification email sent', 'Please check your email and verify your account.');
      } else {
        setLoading(false);
        Alert.alert('User not found', 'Please try again later.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed to send verification email', 'Please try again in 30 seconds.');
      startCountdown(); 
    }
  };

  const startCountdown = () => {
    let timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const resendVerificationEmail = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setLoading(false);
        Alert.alert('Verification email sent', 'Please check your email and verify your account.');
      } else {
        setLoading(false);
        Alert.alert('User not found', 'Please try again later.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed to send verification email', 'Please try again in 60 seconds.');
      startCountdown(); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>A verification email has been sent to your registered email address.</Text>
      {loading && <ActivityIndicator size="large" color="#FFA500" />}
      <TouchableOpacity
        style={styles.resendButton}
        onPress={initialLoad ? undefined : resendVerificationEmail}
        enaabled={countdown > 0}
      >
        <Text style={[styles.buttonText, countdown > 0 && { color: 'gray' }]}>
          Resend Verification Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  resendButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default EmailVerificationScreen;
