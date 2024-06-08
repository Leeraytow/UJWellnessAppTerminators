import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../Configuration/firebase';

const RegEmailVerification = () => {
  const navigation = useNavigation();
  const [error, setErr] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      Alert.alert('Verification email sent', 'Please check your email and verify your account.');  
      sendVerificationEmail();
      setInitialLoad(false);
    }
  }, []);

  const sendVerificationEmail = async () => {
  
    try{
      const user = auth.currentUser;
      await sendEmailVerification(user);
    } catch(error){
        setErr("");
    }
    
      
  };

  const backToLogin = () => {
    navigation.navigate("StudentLogin")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>A verification email has been sent to your registered email address.</Text>
     
      <TouchableOpacity
        style={styles.resendButton}
        onPress={backToLogin}
       
      >
        <Text style={styles.buttonText}>
          Back to login
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
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

});

export default RegEmailVerification;
