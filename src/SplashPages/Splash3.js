import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function SplashPage1({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../images/splash2.jpeg')}
          style={styles.image}
        />
       
        <TouchableOpacity style={styles.stepButton}>
          <Text style={styles.stepText}>Step Two</Text>
        </TouchableOpacity>
      </View>

      {/* Curve Section */}
      <Svg 
        height="60" 
        width={width} 
        viewBox="0 0 1440 320" 
        style={styles.svgCurve}
      >
        <Path 
          fill="#FFFFFF"
          d="M0,224L1440,32L1440,320L0,320Z"
        />
      </Svg>

      {/* Text Section with a white background */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          You are Not Alone{' '}
          <Text style={styles.highlight}>UJ Wellness</Text>
        </Text>
        
        {/* Description section */}
        <Text style={styles.description}>
          Welcome to our mental health app designed for students, offering a safe space to explore wellness 
          strategies and seek support.
        </Text>

        {/* Skip and Arrow Buttons */}
        <View style={styles.buttonContainer}>
          {/* Skip Button */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('TermsScreen')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Arrow Button for Next */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('WelcomeScreen')}
          >
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCC80',  // Soft orange background
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.7,
    backgroundColor: '#FFCC80',  // Orange background for consistency
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stepButton: {
    position: 'absolute',
    top: 40,
    left: '50%',  
    transform: [{ translateX: -50 }],
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#FF7043',  // Orange border
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent white
  },
  stepText: {
    fontSize: 18,
    color: '#FF7043',  // Orange text color
  },
  svgCurve: {
    position: 'absolute',
    top: height * 0.65,
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -50,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF7043',  // Orange title color
    marginBottom: 10,
  },
  highlight: {
    color: '#FFB74D',  // Lighter orange highlight
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFB74D',  // Light orange border
    borderRadius: 30,
  },
  skipText: {
    fontSize: 16,
    color: '#FF7043',  // Orange text for Skip button
  },
  button: {
    backgroundColor: '#FF7043',  // Orange button
    padding: 20,
    borderRadius: 50,
  },
  arrow: {
    fontSize: 28,
    color: '#fff',
  },
});