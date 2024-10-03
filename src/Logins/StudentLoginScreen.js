import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../Configuration/firebase';
import CustomCheckbox from './CustomCheckbox';

export default function StudentAuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (loading) {
      isLogin ? handleLogin() : handleRegister();
    }
  }, [loading]);

  const validateEmail = (inputText) => {
    const emailPattern = /^[0-9]{9,}@student\.uj\.ac\.za$|^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(inputText.trim());
  };

  const validatePassword = (inputText) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return passwordPattern.test(inputText);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async () =>{
    if (email === '' || password === '' || username === '') {
      setError('Required fields are missing');
      setLoading(false);
      return;
      
    }
  
    if (!validateEmail(email)) {
      setError('Please Enter Your Student Email');
      setLoading(false); // Stop loading
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Stop loading
      return;
    }
  
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, special character and a number.');
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      // Step 1: Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Step 2: Send email verification
      await sendEmailVerification(user);
      await signOut(auth); // Log out user after verification
  
      // Step 3: Save user data to Firestore with the "active" field
      const userRef = doc(collection(db, 'Students'), user.uid);
      await setDoc(userRef, {
        name: username,
        email: email,
        profilePicture:  require('../images/profile.png'),
        active: false,  // Set active to false during registration
      });
  
      navigation.navigate('RegEmailVerification', { userEmail: email, userName: username, uid: user.uid });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const handleLogin = async () => {
    const Email = email.trim();
  
    if (!Email || !password) {
      setError('All fields are required');
      setLoading(false); // Stop loading
      return;
    }
  
    if (!validateEmail(Email)) {
      setError('Invalid email address');
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, Email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        setError('Please verify your email before logging in.');
        setLoading(false); // Stop loading
        return navigation.navigate('EmailVerification', { userEmail: Email });
      }
  
      const userRef = doc(db, 'Students', user.uid);
      await setDoc(userRef, { active: true }, { merge: true });
  
      const isAdmin = Email.endsWith('@gmail.com');
      if (isAdmin) {
        navigation.navigate('TherapistLandingScreen');
      } else if (Email.endsWith('@student.uj.ac.za')) {
        const usersCollection = collection(db, 'Students');
        const q = query(usersCollection, where('email', '==', Email));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.size === 1) {
          querySnapshot.forEach((doc) => {
            const userName = doc.data().name;
            navigation.navigate('MainPage', { userName, userEmail: Email });
          });
        } else {
          setError('User not found');
        }
      } else {
        setError('Invalid user role');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  

  const handleSubmit = () => {
    setError('');
    setLoading(true);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address and then press Forgot Password');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError('Error sending password reset email: ' + error.message);
    }
    
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/back12345.png')} style={styles.background}>
        <View style={styles.authContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.activeTab]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.activeTab]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create An Account'}</Text>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={setUsername}
                value={username}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#000" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
            </View>
          )}

          {isLogin && (
            <View style={styles.rememberForgotContainer}>
              <View style={styles.rememberMeContainer}>
                <CustomCheckbox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#8A2BE2" />}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

        
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6F00',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 38,
  },
  eyeIcon: {
    padding: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: '#777',
  },
  forgotPasswordText: {
    color: 'red',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  orText: {
    color: '#777',
    marginVertical: 15,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  toggleAuthText: {
    color: '#8A2BE2',
    fontSize: 14,
  },

  
});