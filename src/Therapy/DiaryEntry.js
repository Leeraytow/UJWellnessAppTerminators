import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert, Platform,SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import Voice from 'react-native-voice';
import { PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Menu/Header';
import Footer from '../Menu/Footer';

const DigitalDiary = () => {
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [mood, setMood] = useState('');
  const [diaryText, setDiaryText] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recognitionMessage, setRecognitionMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const lastEntryDate = diaryEntries.length > 0 ? diaryEntries[diaryEntries.length - 1].date : null;

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    if (Platform.OS === 'android') {
      requestPermissions();
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestPermissions = async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Error', 'Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    setRecognitionMessage('Recording has started...');
    setRecording(true);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
      setRecognitionMessage('Error starting recording');
    }
  };

  const stopRecording = async () => {
    setRecording(false);
    setRecognitionMessage('Recording stopped.');
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
      setRecognitionMessage('Error stopping recording');
    }
  };

  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      setDiaryText(event.value[0]);
      setRecognitionMessage('Speech recognized and displayed.');
    }
  };

  const onSpeechError = (event) => {
    Alert.alert('Error', 'There was an issue with speech recognition.');
    setRecording(false);
    setRecognitionMessage('Speech recognition failed.');
  };

  const handlePostDiary = () => {
    if (lastEntryDate === currentDate) {
      Alert.alert('Entry Restricted', 'You have already posted a diary entry today.');
      return;
    }

    if (diaryText.split(' ').length > 500) {
      Alert.alert('Error', 'Diary entry exceeds the 500-word limit.');
      return;
    }

    if (diaryText) {
      const newEntry = { text: diaryText, imageUri, mood, date: currentDate };
      setDiaryEntries([...diaryEntries, newEntry]);
      Alert.alert('Success', 'Diary entry posted!');
      resetDiaryInputs();
    } else {
      Alert.alert('Error', 'Please write your diary entry before posting.');
    }
  };

  const resetDiaryInputs = () => {
    setDiaryText('');
    setImageUri(null);
    setMood('');
    setShowAdditionalOptions(false);
    setRecognitionMessage('');
    setEditingIndex(null);
  };

  const handleEditDiary = (index) => {
    const entryToEdit = diaryEntries[index];
    setDiaryText(entryToEdit.text);
    setImageUri(entryToEdit.imageUri);
    setMood(entryToEdit.mood);
    setEditingIndex(index);
    setShowAdditionalOptions(true);
  };

  const handleUpdateDiary = () => {
    if (editingIndex !== null) {
      const updatedEntries = diaryEntries.map((entry, index) =>
        index === editingIndex ? { ...entry, text: diaryText, imageUri, mood } : entry
      );
      setDiaryEntries(updatedEntries);
      setEditingIndex(null);
      Alert.alert('Success', 'Diary entry updated!');
      resetDiaryInputs();
    }
  };

  const handlePlayDiary = (text) => {
    if (isPlaying) {
      Speech.stop(); 
      setIsPlaying(false);
    } else {
      Speech.speak(text);
      setIsPlaying(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <LinearGradient colors={['#FC9842', '#FE5F75']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, Lerato!</Text>
        </View>

        <Text style={styles.diaryHeading}>My Diary</Text>
        <View style={styles.diarySection}>
          <View style={styles.diaryContent}>
            {diaryEntries.length > 0 ? (
              diaryEntries.map((entry, index) => (
                <View key={index} style={styles.diaryEntry}>
                  <View style={styles.entryBorder} />
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Text style={styles.entryMood}>Feeling: {entry.mood || '❔'}</Text>
                  <View style={styles.entryTop}>
                    <Image 
                      source={entry.imageUri ? { uri: entry.imageUri } : require('../images/noImage.jpg')}
                      style={styles.entryImage} 
                    />
                  </View>
                  <Text style={styles.entryText}>{entry.text}</Text>
                  <View style={styles.entryActions}>
                    <View style={styles.actionButtonContainer}>
                      <TouchableOpacity onPress={() => handleEditDiary(index)} style={styles.actionButton}>
                        <Icon name="edit" size={13} color="#000" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handlePlayDiary(entry.text)} style={styles.actionButton}>
                        <Icon name={isPlaying ? "pause" : "play"} size={13} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noEntriesText}>Start Today's Diary</Text>
            )}
          </View>
        </View>

        {showAdditionalOptions && (
          <View style={styles.additionalOptions}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.uploadText}>Upload Image (Optional)</Text>
              )}
            </TouchableOpacity>

            <View style={styles.moodChooser}>
              <Text style={styles.moodText}>Choose Mood:</Text>
              <View style={styles.moodOptions}>
                {['😊', '😄', '😡', '😢'].map((emoji) => (
                  <TouchableOpacity key={emoji} onPress={() => setMood(emoji)}>
                    <Text style={styles.emoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {mood && <Text style={styles.selectedMood}>Your mood: {mood}</Text>}
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Write your diary entry..."
              multiline
              value={diaryText}
              onChangeText={setDiaryText}
              maxLength={500}
            />

            <TouchableOpacity onPress={editingIndex !== null ? handleUpdateDiary : handlePostDiary} style={styles.postButton}>
              <Text style={styles.buttonText}>{editingIndex !== null ? 'Update Entry' : 'Post Entry'}</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.addEntryButton}
          onPress={() => setShowAdditionalOptions(!showAdditionalOptions)}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
      </LinearGradient>
      <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  diaryHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  diarySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  diaryContent: {
    maxHeight: 500,
    overflow: 'hidden',
  },
  diaryEntry: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  entryBorder: {
    borderBottomWidth: 1,
    borderColor: '#F58426',
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 20,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  entryMood: {
    fontWeight: 'bold',
    color: '#F58426',
    marginBottom: 8,
    textAlign: 'center',
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  entryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  entryText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginRight: 10,
  },
  noEntriesText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  additionalOptions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  imagePicker: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  uploadText: {
    color: '#888',
  },
  moodChooser: {
    marginBottom: 16,
  },
  moodText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 24,
  },
  selectedMood: {
    marginTop: 8,
    color: '#333',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: '#F58426',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addEntryButton: {
    backgroundColor: '#F58426',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default DigitalDiary;
