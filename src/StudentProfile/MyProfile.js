import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; 

const MyProfile = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  const [username, setUsername] = useState('Leece Precious');
  const [email, setEmail] = useState('222001759@student.uj.ac.za');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleUpdate = () => {
    console.log('Updating profile...');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
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

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#333' }]}>Email</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <FontAwesome name="envelope" size={20} color={isDarkMode ? '#FFA500' : '#FF6F00'} style={styles.icon} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
    marginTop: 30,
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
