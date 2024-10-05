import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from './ThemeContext';
import { signOut, deleteUser } from 'firebase/auth';
import { auth, db } from '../../src/Configuration/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileComponent = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  const [pickedImage, setPickedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, 'Students', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUsername(userData.name || '');
          setEmail(userData.email || '');
          setCurrentImage(userData.profileImage || null);
        } else {
          console.log('User not found in the Students collection.');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    }
  };

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
      handleUpdateImage(result.assets[0].uri);
    }
  };

  const handleUpdateImage = async (imageUri) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    if (imageUri) {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `profileImages/${user.uid}_${Date.now()}.jpg`);

        const response = await fetch(imageUri);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);

        const userRef = doc(db, 'Students', user.uid);
        await updateDoc(userRef, { profileImage: imageUrl });
        setCurrentImage(imageUrl);
        Alert.alert('Success', 'Profile image updated successfully!');
      } catch (error) {
        Alert.alert('Update Error', 'Failed to update profile image. Please try again.');
        console.error('Error updating profile image: ', error);
      }
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await updateDoc(doc(db, 'Students', user.uid), { active: false });
                await signOut(auth);
                navigation.replace('StudentLogin');
              }
            } catch (error) {
              console.error('Error signing out: ', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteDoc(doc(db, 'Students', user.uid));
                await deleteUser(user);
                navigation.replace('StudentLogin');
              }
            } catch (error) {
              console.error('Error deleting user account or data: ', error);
              Alert.alert('Error', 'There was an error deleting your account. Please try again.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const MenuItem = ({ icon, text, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#FF6F00" />
      <Text style={styles.menuItemText}>{text}</Text>
      <Ionicons name="chevron-forward" size={24} color="#FF6F00" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity onPress={pickImage}>
          <Image 
            source={{ uri: pickedImage || currentImage || 'https://via.placeholder.com/150' }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.menuContainer}>
          <MenuItem icon="person-outline" text="My Profile" onPress={() => navigation.navigate('MyProfile')} />
          <MenuItem icon="settings-outline" text="Accessibility Settings" onPress={() => navigation.navigate('AccessibilitySettings')} />
          <MenuItem icon="options-outline" text="Customizable Settings" onPress={() => navigation.navigate('CustomizableSettings')} />
          <MenuItem icon="call-outline" text="Emergency Contacts" onPress={() => navigation.navigate('HelpLine')} />
          <MenuItem icon="chatbubble-outline" text="Feedback and Support" onPress={() => navigation.navigate('Feedback')} />
          <MenuItem icon="lock-closed-outline" text="Security Info" onPress={() => navigation.navigate('SecurityInfo')} />
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F00',
    paddingVertical: 16,
    marginTop: 40, 
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF9800',
    marginBottom: 16,
  },
  infoCard: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F00',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#FF9800',
    textAlign: 'center',
    marginTop: 4,
  },
  menuContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
  signOutButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  deleteAccountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileComponent;
