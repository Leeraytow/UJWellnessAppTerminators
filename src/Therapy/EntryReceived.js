import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EntryReceived = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('TherapyType'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../images/Icon.png')} style={styles.logo} />
          <Text style={styles.headerText}>UJ WELLNESS</Text>
        </View>
        <Icon name="menu" size={30} color="#000" />
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require('../images/EntryDiary.png')} style={styles.image} />
        </View>
        <Text style={styles.message}>We are Here For YOU</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENTRY RECEIVED</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>
          Please wait patiently one of our professionals will get back to you shortly.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    paddingTop: 40, // Adjust this to move the header higher
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, 
  },
  imageContainer: {
    backgroundColor: '#FBF1D7', 
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: 370,
    height: 350, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 600,
    height: 600,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  bottomText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default EntryReceived;

