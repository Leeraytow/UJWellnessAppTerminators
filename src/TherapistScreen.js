import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// -- Components --
const Header = () => (
  <View>
    <View style={styles.logoContainer}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Hello, Wellness Warrior!</Text>
      <Text style={styles.subtitle}>"It's time to illuminate the path to wellness"</Text>
    </View>
  </View>
);

const RememberMeCheckbox = ({ rememberMe, toggleRememberMe }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity onPress={toggleRememberMe}>
      <View style={[styles.checkbox, rememberMe && styles.checked]} />
    </TouchableOpacity>
    <Text style={styles.checkboxLabel}>Remember Me</Text>
  </View>
);

const CreateAccountLink = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('TherapistRegisterScreen')}>
    <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
  </TouchableOpacity>
);

// -- Main Component --
export default function TherapistLoginScreen() {
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
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
              secureTextEntry={true}
            />
            <Image
              source={require('../images/password.png')}
              style={styles.inputIcon}
            />
          </View>

          <View style={styles.rememberForgotContainer}>
            <RememberMeCheckbox rememberMe={rememberMe} toggleRememberMe={toggleRememberMe} />
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.createAccountWrapper}>
            <CreateAccountLink navigation={navigation} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

// -- Styles --
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8', // Soft, calming background
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    // Remove if you don't want a background image
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
    elevation: 5, // Android shadow
  },
  headerContainer: {
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
    color: '#333', // Dark text for contrast
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555', // Slightly lighter text
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
    width: 30,
    height: 30,
    marginRight: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxWrapper: {
    // To center the checkbox and checkmark
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFA500', // Orange color
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#FFA500', // Orange color
  },
  checkIcon: {
    width: 14,
    height: 14,
  },
  checkboxLabel: {
    color: '#555',
  },
  forgotPasswordButton: {
    // Make it less prominent
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#777',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FFA500', // Orange color
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
    borderTopColor: 'rgba(255, 165, 0, 0.5)', // Orange with 50% opacity
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 15,
  },
  createAccountText: {
    color: '#FFA500', // Orange color
    fontSize: 16,
    textAlign: 'center',
  },
});
