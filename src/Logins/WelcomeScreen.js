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
           source={require('../images/splash3.jpeg')}
          style={styles.image}
        />
       
        <TouchableOpacity style={styles.stepButton}>
          <Text style={styles.stepText}>Step Three</Text>
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
          Community Support{' '}
          <Text style={styles.highlight}>UJ Wellness</Text>
        </Text>
        
        {/* Description section */}
        <Text style={styles.description}>
          Join our student-focused mental health community where you can find
          encouragement, guidance, and practical solutions for managing stress.
        </Text>

        {/* Buttons for Get Started and Skip */}
        <View style={styles.buttonContainer}>
          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('TermsScreen')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>

          {/* Skip Button */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('TermsScreen')}  
          >
            <Text style={styles.skipText}>Skip</Text>
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
    height: height * 0.7,  // Image height increased
    backgroundColor: '#FFCC80',  // Orange background for consistency
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stepButton: {
    position: 'absolute',
    top: 40,  // Position near the top
    left: '50%',  // Center it horizontally
    transform: [{ translateX: -50 }],  // Move back by half its width to center
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#FF7043',  // Orange border
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Transparent white background
  },
  stepText: {
    fontSize: 18,
    color: '#FF7043',  // Orange text color
  },
  svgCurve: {
    position: 'absolute',
    top: height * 0.65,  // Adjust the curve position relative to the image height
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -50,
    justifyContent: 'flex-end',  // Push content to the bottom
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
    marginBottom: 20,  // Space between description and buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#FF7043',  // Orange button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  getStartedText: {
    fontSize: 16,
    color: '#FFFFFF',
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
});