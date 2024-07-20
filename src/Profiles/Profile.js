import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextSizeContext } from './TextSizeContext';

const Profile = () => {
  const navigation = useNavigation();
  const { textSize } = useContext(TextSizeContext);
  const [profilePicture, setProfilePicture] = useState(require('./profile.jpeg'));

  const handleSignOut = () => {
    Alert.alert("Confirm Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "Sign Out", onPress: () => console.log("User signed out") }
    ]);
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

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={pickImage}>
        <Image style={styles.profilePicture} source={profilePicture} />
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('MyProfile')}>
        <Text style={[styles.itemText, { fontSize: textSize }]}>My Profile</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('AccessibilitySettings')}>
        <Text style={[styles.itemText, { fontSize: textSize }]}>Accessibility Settings</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('CustomizableSettings')}>
        <Text style={[styles.itemText, { fontSize: textSize }]}>Customizable Settings</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('EmergencyContacts')}>
        <Text style={[styles.itemText, { fontSize: textSize }]}>Emergency Contacts</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('FeedbackSupport')}>
        <Text style={[styles.itemText, { fontSize: textSize }]}>Feedback and Support</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={() => navigation.navigate('SecurityInfo')}>
        <Text style={[styles.itemText, { fontSize: textSize }]}>Security Info</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.signOut} onPress={handleSignOut}>
        <Text style={[styles.signOutText, { fontSize: textSize }]}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    color: '#FFA500',
  },
  signOut: {
    marginTop: 32,
    paddingVertical: 16,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
