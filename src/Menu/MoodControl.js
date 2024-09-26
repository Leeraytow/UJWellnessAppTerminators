import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, TextInput, Alert, Linking } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import Emoji from './Emoji';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import * as SecureStore from 'expo-secure-store';
import StudentMoodHistory from './MoodHistory';

const MoodControl = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [note, setNote] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const data = await SecureStore.getItemAsync('moodHistory');
        if (data) {
          setMoodData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching mood data:', error);
      }
    };
    fetchMoodData();
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
    };

    const updatedMoodData = { ...moodData, [selectedDate]: newEntry };

    try {
      await SecureStore.setItemAsync('moodHistory', JSON.stringify(updatedMoodData));
      setMoodData(updatedMoodData);
      setNote('');
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
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>How are you feeling?</Text>
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
          style={styles.textInput}
          placeholder="Why do you feel this way?"
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
          <Text style={styles.saveButtonText}>Save Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={StudentMoodHistory}>
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
    backgroundColor: '#f5f5f5',
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
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    height: 100,
    marginVertical: 20,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#ffa500',
    borderRadius: 8,
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
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MoodControl;