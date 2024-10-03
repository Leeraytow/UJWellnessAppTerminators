import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, TextInput, Alert, Linking } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import Emoji from './Emoji';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons'; 
import { doc, getDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';

const MoodControl = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setEmail(userData.email || '');
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

  const emotions = [
    { emoji: '😃', label: 'Excited', id: 1, value: 8 },
    { emoji: '😊', label: 'Happy', id: 2, value: 7 },
    { emoji: '😐', label: 'Discouraged', id: 3, value: 6 },
    { emoji: '😟', label: 'Worried', id: 5, value: 5 },
    { emoji: '😢', label: 'Sad', id: 8, value: 4 },
    { emoji: '😨', label: 'Anxious', id: 4, value: 3 },
    { emoji: '😩', label: 'Frustrated', id: 7, value: 1 },
    { emoji: '😠', label: 'Angry', id: 6, value: 2 },
    { emoji: '💔', label: 'Suicidal', id: 9, value: 0 },
  ];

  const suicidePreventionNumber = 'tel:0607628321'; 

  const handleEmojiPress = (id) => {
    setSelectedEmotion(id);

    if (id === 9) {
      Alert.alert(
        'Contact Suicide Prevention',
        'You have selected the "Suicidal" emotion. Would you like to call the suicide prevention hotline?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Call',
            onPress: () => Linking.openURL(suicidePreventionNumber),
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleSaveMood = async () => {
    if (!selectedEmotion || !note) {
      Alert.alert('Please select an emotion and write a note.');
      return;
    }

    const selectedEmotionData = emotions.find(emotion => emotion.id === selectedEmotion);
    const newEntry = {
      date: selectedDate,
      emotion: selectedEmotionData.label,
      emoji: selectedEmotionData.emoji,
      note,
      email,
    };

    try {
      await addDoc(collection(db, 'moodlogs'), newEntry);
      setNote('');
      setSelectedEmotion(null);
      Alert.alert('Mood saved successfully!');
    } catch (error) {
      console.error('Error saving mood data:', error);
      Alert.alert('Error saving mood data.');
    }
  };

  const navigateToHistory = () => {
    navigation.navigate('StudentMoodHistory');
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.heading, isDarkMode ? styles.darkText : styles.lightText]}>How are you feeling?</Text>
        <View style={styles.emojiGrid}>
          {emotions.map((emotion) => (
            <Emoji
              key={emotion.id}
              emoji={emotion.emoji}
              label={emotion.label}
              onPress={() => handleEmojiPress(emotion.id)}
              isSelected={selectedEmotion === emotion.id}
            />
          ))}
        </View>
        <TextInput
          style={[styles.textInput, isDarkMode ? styles.darkTextInput : styles.lightTextInput]}
          placeholder="Why do you feel this way?"
          placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity style={[styles.saveButton, styles.shadow]} onPress={handleSaveMood}>
          <Text style={styles.saveButtonText}>Save Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.historyButton, styles.shadow]} onPress={navigateToHistory}>
          <Text style={styles.historyButtonText}>View All Mood Logs</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textInput: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
    height: 120,
    textAlignVertical: 'top',
  },
  lightTextInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  darkTextInput: {
    backgroundColor: '#2e2e2e',
    borderColor: '#444',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#ff6347',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#FC9842',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MoodControl;
