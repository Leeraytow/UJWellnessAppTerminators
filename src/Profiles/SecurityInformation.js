import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SecurityInfo = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Password updated successfully');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Login and Authentication</Text>
        <View style={styles.passwordUpdateContainer}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={text => setCurrentPassword(text)}
              secureTextEntry={!currentPasswordVisible}
            />
            <TouchableOpacity onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}>
              <FontAwesome name={currentPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="grey" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              secureTextEntry={!newPasswordVisible}
            />
            <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
              <FontAwesome name={newPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="grey" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={!confirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              <FontAwesome name={confirmPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="grey" />
            </TouchableOpacity>
          </View>

          <Pressable style={styles.updateButton} onPress={handleUpdatePassword}>
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
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#FFA500',
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
