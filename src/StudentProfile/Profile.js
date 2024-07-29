import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../Configuration/firebase'; 

const Profile = () => {
  const navigation = useNavigation();
  const [profilePicture, setProfilePicture] = useState(require('../images/alice.jpeg'));
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSignOut = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => {
            signOut(auth)
              .then(() => {
                console.log('User signed out');
                navigation.replace('StudentLogin'); // Redirect to the Login screen after sign out
              })
              .catch(error => {
                console.error('Error signing out: ', error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture({ uri: result.uri });
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F00" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={pickImage}>
          <Animated.Image style={[styles.profilePicture, { transform: [{ scale: scaleAnim }] }]} source={profilePicture} />
        </Pressable>
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Leece Precious</Text>
          <Text style={styles.email}>222001759@student.uj.ac.za</Text>
        </View>

        <Pressable style={styles.item} onPress={() => navigation.navigate('MyProfile')}>
          <Ionicons name="person-outline" size={24} color="#FF6F00" />
          <Text style={styles.itemText}>My Profile</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#FF6F00" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => navigation.navigate('AccessibilitySettings')}>
          <Ionicons name="settings-outline" size={24} color="#FF6F00" />
          <Text style={styles.itemText}>Accessibility Settings</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#FF6F00" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => navigation.navigate('CustomizableSettings')}>
          <Ionicons name="options-outline" size={24} color="#FF6F00" />
          <Text style={styles.itemText}>Customizable Settings</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#FF6F00" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => navigation.navigate('EmergencyContacts')}>
          <Ionicons name="call-outline" size={24} color="#FF6F00" />
          <Text style={styles.itemText}>Emergency Contacts</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#FF6F00" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => navigation.navigate('Feedback')}>
          <Ionicons name="chatbubble-outline" size={24} color="#FF6F00" />
          <Text style={styles.itemText}>Feedback and Support</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#FF6F00" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => navigation.navigate('SecurityInfo')}>
          <Ionicons name="lock-closed-outline" size={24} color="#FF6F00" />
          <Text style={styles.itemText}>Security Info</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#FF6F00" />
        </Pressable>

        <Pressable style={styles.signOut} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 30, // Adjust this value to move the header down
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF6F00',
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginLeft: 16,
  },
  signOut: {
    marginTop: 32,
    paddingVertical: 16,
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;