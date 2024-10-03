import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const MyProfile = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name || '');
            setEmail(userData.email || '');
            setAge(userData.age || '');
            setGender(userData.gender || '');
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

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'Students', user.uid);
        await updateDoc(userRef, {
          name: username,
          age: age,
          gender: gender,
        });
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'There was an error updating your profile. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Username */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#333' }]}>Username</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <FontAwesome name="user" size={20} color={isDarkMode ? '#FFA500' : '#FF6F00'} style={styles.icon} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#333' }]}>Email</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <FontAwesome name="envelope" size={20} color={isDarkMode ? '#FFA500' : '#FF6F00'} style={styles.icon} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={email}
              editable={false} // Non-editable email
            />
          </View>
        </View>

        {/* Age */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#333' }]}>Age</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <FontAwesome name="calendar" size={20} color={isDarkMode ? '#FFA500' : '#FF6F00'} style={styles.icon} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={age}
              onChangeText={text => setAge(text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Gender */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#333' }]}>Gender</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <FontAwesome name="venus-mars" size={20} color={isDarkMode ? '#FFA500' : '#FF6F00'} style={styles.icon} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={gender}
              onChangeText={text => setGender(text)}
            />
          </View>
        </View>

        {/* Update Button */}
        <Pressable style={[styles.updateButton, { backgroundColor: isDarkMode ? '#FFA500' : '#FF6F00' }]} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 30,
    marginTop: 30,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollView: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  updateButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  updateButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyProfile;
