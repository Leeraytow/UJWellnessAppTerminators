import React from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ImageBackground,Image,ScrollView,KeyboardAvoidingView,Platform,} from 'react-native';

// -- Components --
const Header = () => (
  <View>
    <View style={styles.logoContainer}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join us and start helping others on their journey to wellness</Text>
    </View>
  </View>
);

// -- Main Component --
export default function TherapistRegisterScreen() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <ImageBackground source={require('../images/mental.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.registerContainer}>
            <Header />

            {/* Registration Form */}
            <TextInput style={styles.input} placeholder="Full Name" />
            <TextInput style={styles.input} placeholder="Email Address" />
            <TextInput style={styles.input} placeholder="Phone Number" />

            {/* Education Background */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Education Background</Text>
              <View style={styles.educationContainer}>
                <TextInput style={styles.inputSub} placeholder="Level of Education" />
                <TextInput style={styles.inputSub} placeholder="Institution" />
                <TextInput style={styles.inputSub} placeholder="Year" />
              </View>
            </View>

            {/* Short Bio or Summary */}
            <TextInput
              style={[styles.input, styles.bioInput]} // Apply additional styles for bio input
              placeholder="Short Bio or Summary"
              multiline={true} // Allow multiline input
              numberOfLines={4} // Set the number of lines visible initially (adjust as needed)
            />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />

            {/* Terms and Agreements */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>
                Consent to <Text style={styles.link}>terms of service</Text> and <Text style={styles.link}>privacy policy</Text>
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>
                Agreement to abide by <Text style={styles.link}>ethical guidelines</Text> and <Text style={styles.link}>regulations</Text>
              </Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Sign up</Text>
            </TouchableOpacity>

            {/* Continue with Social Accounts */}
            <Text style={styles.orText}>Or continue with</Text>
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
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

// -- Styles --
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8', // Soft, calming background
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Adjusted padding to prevent reaching the time
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    backgroundColor: 'white',
    padding: 10, // Adjusted padding for content spacing
    borderRadius: 15,
    width: '95%', // Adjusted width to fit content on the phone
    maxWidth: 400, // Added maximum width for larger screens
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
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
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  educationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSub: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 5,
  },
  input: {
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFA500',
    marginRight: 10,
  },
  checkboxLabel: {
    color: '#555',
    fontSize: 16,
  },
  link: {
    color: '#FFA500',
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
  orText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  bioInput: {
    height: 100, // Adjust the height as needed
  },
});
