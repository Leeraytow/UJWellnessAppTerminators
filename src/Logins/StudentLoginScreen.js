import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword} from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase'


const Header = () => (
  <View>
    <View style={styles.logoContainer}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Welcome back, Champ!</Text>
      <Text style={styles.subtitle}>It's time to feel better!</Text>
    </View>
  </View>
);

export default function StudentLoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const validateEmail = (inputText) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(inputText.trim());
  };

  const validatePassword = (inputText) => {
    return inputText.length >= 6;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  

  const handleLogin = async () => {
    const Email = email.trim();

    if (!Email || !password) {
      setError('All fields are required');
      setTimeout(() => setError(''), 12000);
      return;
    } else if (!validateEmail(Email)) {
      setError('Invalid email address');
      setTimeout(() => setError(''), 12000);
      return;
    } else if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      setTimeout(() => setError(''), 12000);
      return;
    }
    setLoading(true);
     try {
      await signInWithEmailAndPassword(auth, Email, password)
      const usersCollection = collection(db, 'Students');
      const q = query(usersCollection, where('email', '==', Email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size === 1) {
        querySnapshot.forEach((doc) => {
          const userName = doc.data().name;
  
          navigation.navigate('Homepage', { userName: userName, userEmail: Email });

        });
      }
    } catch (error){
      setError(error.message);
      setTimeout(() => setError(''), 12000);
    } finally {
      setLoading(false);
    }
  };
  const handleRegisterPress = () => {
    navigation.navigate('StudentRegister');
  };

  const handleForgotPasswordPress = () => {
      navigation.navigate('PasswordResetScreen', { userEmail: email });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/mental.png')} style={styles.background}>
        <View style={styles.loginContainer}>
          <Header />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <Image
              source={require('../images/email.png')}
              style={styles.inputIcon}
             
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            />
             <TouchableOpacity onPress={togglePasswordVisibility} style={styles.inputIcon}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" />
          </TouchableOpacity>
           
          </View>

          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPasswordPress}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign in</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#FFA500" />}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity style={styles.createAccountWrapper} onPress={handleRegisterPress}>
            <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
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
  loginContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    minWidth: 300,
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
    marginBottom: 10,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#777',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FFA500', 
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  createAccountWrapper: {
    borderTopColor: 'rgba(255, 165, 0, 0.5)', 
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 15,
  },
  createAccountText: {
    color: '#FFA500', 
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    
  },
});
