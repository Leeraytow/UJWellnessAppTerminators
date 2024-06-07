import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import {auth, db} from '../Configuration/firebase';


const Header = () => (
  <View>
    <View style={styles.logoContainer}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join us and let us help you on your journey to wellness</Text>
    </View>
  </View>
);

export default function StudentRegisterScreen() {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



  const validatePassword = (inputText) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[A-Z]).{6,}$/;
    return passwordPattern.test(inputText);
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

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long, contain at least one uppercase letter, and one lowercase letter.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const usersCollection = collection(db, 'Students');
      const newUser = {
        name: username,
        email: email,
      };

      await addDoc(usersCollection, newUser);

      alert('Account created successfully');
      

      navigation.navigate('Homepage', { userName: username, userEmail: email });
   
    } catch (error) {
      setError(error.message);
    }finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/mental.png')} style={styles.background}>
        <View style={styles.registerContainer}>
          <Header />

          <TextInput style={styles.input} placeholder="Username"  onChangeText={(text) => setUsername(text)}
            onFocus={() => setUsername('')}/>
          <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text) => setEmail(text)}
            onFocus={() => setEmail('')}/>
         <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} onFocus={() => setPassword('')} />
          <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} secureTextEntry onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} onFocus={() => setConfirmPassword('')} />

          {loading && <ActivityIndicator size="large" color="#FFA500" />}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}


          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Do you want to be anonymous?</Text>
            <View style={styles.radioOption}>
              <TouchableOpacity style={styles.radioButton} />
              <Text style={styles.radioText}>Yes</Text>
            </View>
            <View style={styles.radioOption}>
              <TouchableOpacity style={styles.radioButton} />
              <Text style={styles.radioText}>No</Text>
            </View>
          </View>

         

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText} onPress={createAccount}>Sign up</Text>
          </TouchableOpacity>
           {/* Social media icons */}
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.socialIcon}>
              <Image source={require('../images/google.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.socialIcon}>
              <Image source={require('../images/facebook.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.socialIcon}>
              <Image source={require('../images/twitter.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  radioContainer: {
    marginBottom: 15,
  },
  radioLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FFA500',
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#555',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },

  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
