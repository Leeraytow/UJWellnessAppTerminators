import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from './ThemeContext'; 
import { auth } from '../Configuration/firebase'; // Make sure to import your Firebase configuration
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const SecurityInfo = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        // Step 1: Re-authenticate the user
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // Step 2: Update the password
        await updatePassword(user, newPassword);
        Alert.alert('Success', 'Password updated successfully.');

        // Clear the inputs
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error('Error updating password: ', error);
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={[styles.section, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
        <Text style={[styles.sectionHeader, { color: isDarkMode ? '#FFF' : '#000' }]}>Login and Authentication</Text>
        <View style={styles.passwordUpdateContainer}>
          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#000' }]}>Current Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={currentPassword}
              onChangeText={text => setCurrentPassword(text)}
              secureTextEntry={!currentPasswordVisible}
            />
            <TouchableOpacity onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}>
              <FontAwesome name={currentPasswordVisible ? 'eye' : 'eye-slash'} size={20} color={isDarkMode ? '#FFA500' : 'grey'} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#000' }]}>New Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              secureTextEntry={!newPasswordVisible}
            />
            <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
              <FontAwesome name={newPasswordVisible ? 'eye' : 'eye-slash'} size={20} color={isDarkMode ? '#FFA500' : 'grey'} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { color: isDarkMode ? '#FFF' : '#000' }]}>Confirm New Password</Text>
          <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#555' : '#f9f9f9', borderColor: isDarkMode ? '#666' : '#ccc' }]}>
            <TextInput
              style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={!confirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <FontAwesome name={confirmPasswordVisible ? 'eye' : 'eye-slash'} size={20} color={isDarkMode ? '#FFA500' : 'grey'} />
            </TouchableOpacity>
          </View>

          <Pressable style={[styles.updateButton, { backgroundColor: isDarkMode ? '#FFA500' : '#FF6F00' }]} onPress={handleUpdatePassword}>
            <Text style={styles.updateButtonText}>Update Password</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordUpdateContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  updateButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  updateButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SecurityInfo;
