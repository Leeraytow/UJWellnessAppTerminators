import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase';

const Header = () => (
  <View>
    <View style={styles.logoContainer}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Create Your Account</Text>
    </View>
  </View>
);

export default function TherapistRegistration() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [campus, setCampus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (inputText) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return passwordPattern.test(inputText);
  };

//   const validateEmail = (inputText) => {
//     const emailPattern = /^[a-zA-Z]+@uj\.ac\.za$/;
//     return emailPattern.test(inputText.trim());
//   };


  const validateEmail = (inputText) => {
    const emailPattern = /^[0-9]{9,}@student\.uj\.ac\.za$|^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(inputText.trim());
  };
  

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
    setValue(value);
  };

  async function createAccount() {
    if (email === '' || password === '' || username === '') {
      setError('Required fields are missing');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please Enter Your Email');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, special character and a number.');
      return;
    }
  
    setLoading(true);
    try {
      // Step 1: Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Step 2: Send email verification
      await sendEmailVerification(user);
      await signOut(auth); // Log out user after verification
  
      // Step 3: Save user data to Firestore with the "active" field
      const userRef = doc(collection(db, 'Therapists'), user.uid);
      await setDoc(userRef, {
        name: username,
        email: email,
        active: false, 
        campus: campus// Set active to false during registration
      });
  
      // Show success alert
      Alert.alert(
        "Success",
        "Details posted successfully. Inform the therapist to verify their email.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('EmailVerificationScreen'), // Navigate on press
          }
        ]
      );
  
  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
   
      
  }
  async function handleRegistration() {
    await signOut(auth); // Sign out admin before registration
    createAccount(); // Proceed with the registration
  }
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/background.png')} style={styles.background}>
        <View style={styles.registerContainer}>
          <Header />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Work Email"
            onChangeText={(text) => setEmail(text)}
          />
            <TextInput
            style={styles.input}
            placeholder="Campus"
            onChangeText={(text) => setCampus(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry
            onChangeText={(value) => setConfirmPassword(value)}
          />
          {loading && <ActivityIndicator size="large" color="#FFA500" />}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
            <Text style={styles.registerButtonText}>Sign up</Text>
          </TouchableOpacity>
        
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  registerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    margin: 20,
    shadowColor: '#000',
    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  registerButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 15,
    borderRadius: 10,
   
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
