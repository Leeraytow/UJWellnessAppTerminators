import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

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
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/mental.png')} style={styles.background}>
        <View style={styles.registerContainer}>
          <Header />

          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="Email Address" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />

          {/* Radio buttons for "Do you want to be anonymous?" */}
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
            <Text style={styles.registerButtonText}>Sign up</Text>
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
});
