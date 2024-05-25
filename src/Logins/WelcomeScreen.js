import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  const handleStudentPress = () => {
    navigation.navigate('StudentLogin');
  };

  const handleTherapistPress = () => {
    navigation.navigate('TherapistScreen'); // Change 'TherapistScreen' to the appropriate screen name
  };

  return (
    <ImageBackground source={require('../images/mental.png')} style={styles.background}>
      <View style={styles.container}>
        <Animated.Image source={require('../images/logo.png')} style={[styles.logo, { opacity: fadeAnim }]} />

        <View style={styles.textContainer}>
          <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>Welcome to UJ Wellness!</Animated.Text>
          <Animated.Text style={[styles.subText, { opacity: fadeAnim }]}>To tailor your experience, please let us know who you are.</Animated.Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleStudentPress}>
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTherapistPress}>
            <Text style={styles.buttonText}>Therapist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', 
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'orange',
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
