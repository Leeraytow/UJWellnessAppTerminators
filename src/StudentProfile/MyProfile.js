import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MyProfile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Leece Precious');
  const [email, setEmail] = useState('222001759@student.uj.ac.za');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleUpdate = () => {
    console.log('Updating profile...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F00" />
        </Pressable>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#FF6F00" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#FF6F00" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Age</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="calendar" size={20} color="#FF6F00" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={text => setAge(text)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="venus-mars" size={20} color="#FF6F00" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={text => setGender(text)}
            />
          </View>
        </View>

        <Pressable style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: 30,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#FF6F00',
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
