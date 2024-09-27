import React, { useState, useEffect, useContext,useRef } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc,deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../src/Configuration/firebase';
import { ThemeContext } from './ThemeContext';

import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert, SafeAreaView, Animated,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { signOut, deleteUser } from 'firebase/auth';



import Icon from 'react-native-vector-icons/Ionicons';

const ProfileImageUpdate = ({ navigation }) => {
  
  const [pickedImage, setPickedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCurrentImage = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCurrentImage(userData.profileImage || null);
          }
        } catch (error) {
          console.error('Error fetching user profile image: ', error);
        }
      }
    };

    fetchCurrentImage();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need media library permissions to select an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    
        
      
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      
     
    }
   
   
  };

  useEffect(() => {
    if (pickedImage) {
      handleUpdateImage(); // Call handleUpdateImage when pickedImage changes
    }
  }, [pickedImage]);

  const handleUpdateImage = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    if (pickedImage) {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `profileImages/${user.uid}_${Date.now()}.jpg`);

        // Convert the image to Blob format
        const response = await fetch(pickedImage);
        const blob = await response.blob();

        // Upload the image to Firebase Storage
        await uploadBytes(imageRef, blob);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Update the Firestore database with the new image URL
        const userRef = doc(db, 'Students', user.uid);
        await updateDoc(userRef, { profileImage: imageUrl });

        Alert.alert('Success', 'Profile image updated successfully!');
  
      } catch (error) {
        Alert.alert('Update Error', 'Failed to update profile image. Please try again.');
        console.error('Error updating profile image: ', error);
      }
    } else {
      Alert.alert('No Image Selected', 'Please select an image before updating.');
    }
  };

  const { isDarkMode } = useContext(ThemeContext);
  const [profilePicture, setProfilePicture] = useState(require('../images/alice.jpeg'));
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name || ''); // Set the user's name
            setEmail(userData.email || '');   // Set the user's email
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);
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
            setLoading(true);  // Show loading while signing out
  
            const user = auth.currentUser;
  
            // Ensure user is logged in before proceeding
            if (user) {
              // Update the "active" status to false in Firestore
              const userRef = doc(db, 'Students', user.uid); // Updated to use Firestore doc ref
              updateDoc(userRef, { active: false })
                .then(() => {
                  console.log('User status set to inactive');
  
                  // Proceed with sign-out after updating status
                  signOut(auth)
                    .then(() => {
                      console.log('User signed out');
                      navigation.replace('StudentLogin');  // Redirect to login screen
                    })
                    .catch(error => {
                      console.error('Error signing out: ', error);
                    })
                    .finally(() => {
                      setLoading(false);  // Stop loading after sign-out attempt
                    });
                })
                .catch(error => {
                  console.error('Error updating user status: ', error);
                  setLoading(false);  // Stop loading if update fails
                });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

const fallbackImage= "https://imgs.search.brave.com/iy-sEupdI8V7_1q3MjjWqpGGNTZ53DPoppz8Eascl-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xNDYt/MTQ2ODg0M19wcm9m/aWxlLWljb24tb3Jh/bmdlLXBuZy10cmFu/c3BhcmVudC1wbmcu/cG5n"
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

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const user = auth.currentUser;
            if (user) {
              try {
                // Delete user data from Firestore
                const userDocRef = doc(db, 'Students', user.uid);
                await deleteDoc(userDocRef);

                // Delete the user account from Firebase Authentication
                await deleteUser(user);

                console.log('User account and associated data deleted');
                navigation.replace('StudentLogin'); // Redirect to the Login screen after account deletion
              } catch (error) {
                console.error('Error deleting user account or data: ', error);
                Alert.alert('Error', 'There was an error deleting your account. Please try again.');
              }
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  const [text, setText] = useState('');
  const [name, setName] = useState('User1'); // Replace with dynamic user name
  const [posts, setPosts] = useState([]);



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#F5F5F5' }]}>
      
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>

      <ScrollView contentContainerStyle={styles.scrollView}>
      
      <TouchableOpacity  onPress={pickImage} >

      <Image 
source={{ uri: pickedImage ? pickedImage : currentImage }}  style={[styles.profilePicture]} />

      </TouchableOpacity>
     
    
      <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#333' }]}>{username}</Text>
          <Text style={[styles.email, { color: isDarkMode ? '#888' : '#777' }]}>{email}</Text>
        </View>

        <Pressable style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]} onPress={() => navigation.navigate('MyProfile')}>
          <Ionicons name="person-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
          <Text style={[styles.itemText, { color: isDarkMode ? '#FFF' : '#333' }]}>My Profile</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>

        <Pressable style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]} onPress={() => navigation.navigate('AccessibilitySettings')}>
          <Ionicons name="settings-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
          <Text style={[styles.itemText, { color: isDarkMode ? '#FFF' : '#333' }]}>Accessibility Settings</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>

        <Pressable style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]} onPress={() => navigation.navigate('CustomizableSettings')}>
          <Ionicons name="options-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
          <Text style={[styles.itemText, { color: isDarkMode ? '#FFF' : '#333' }]}>Customizable Settings</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>

        <Pressable style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]} onPress={() => navigation.navigate('EmergencyContacts')}>
          <Ionicons name="call-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
          <Text style={[styles.itemText, { color: isDarkMode ? '#FFF' : '#333' }]}>Emergency Contacts</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>

        <Pressable style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]} onPress={() => navigation.navigate('Feedback')}>
          <Ionicons name="chatbubble-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
          <Text style={[styles.itemText, { color: isDarkMode ? '#FFF' : '#333' }]}>Feedback and Support</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>

        <Pressable style={[styles.item, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]} onPress={() => navigation.navigate('SecurityInfo')}>
          <Ionicons name="lock-closed-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
          <Text style={[styles.itemText, { color: isDarkMode ? '#FFF' : '#333' }]}>Security Info</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>

        <Pressable style={[styles.signOut, { backgroundColor: isDarkMode ? '#FFA500' : '#FF6F00' }]} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        <Pressable style={[styles.signOut, { backgroundColor: isDarkMode ? '#FFA500' : '#FF6F00' }]} onPress={handleDeleteAccount}>
          <Text style={styles.signOutText}>Delete Account</Text>
        </Pressable>
      </ScrollView>

    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  }, header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profilePicture: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 3,
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    flex: 1,
    marginLeft: 16,
  },
  signOut: {
    marginTop: 32,
    paddingVertical: 16,
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
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default ProfileImageUpdate;
