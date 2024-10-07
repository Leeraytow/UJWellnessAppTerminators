import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ThemeContext } from '../StudentProfile/ThemeContext'; // Adjust the import path if needed

const AdminHomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const backgroundImage = isDarkMode 
    ? require('../images/1328396.png') // Dark mode image
    : require('../images/Naruto.png'); 
    

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDarkMode ? '#FFA500' : '#333' }]}>Admin Dashboard</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Users')}>
            <Text style={styles.buttonText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigation('UserFeedback')}>
            <Text style={styles.buttonText}>View User Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigation('AdminVideos')}>
            <Text style={styles.buttonText}>Manage Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigation('TherapistRegistration')}>
            <Text style={styles.buttonText}>Therapist Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainPost')}>
            <Text style={styles.buttonText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Profile')}>
            <Text style={styles.buttonText}>Admin Settings</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#FF6F00', // Keep the button color consistent
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AdminHomeScreen;
