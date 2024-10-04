import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { doc, addDoc, getDocs, collection, query, where, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  const [editingIndex, setEditingIndex] = useState(null);
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const storage = getStorage();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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

  const uploadImageToFirebase = async (uri) => {
    if (!uri) return null;

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `diaryImages/${Date.now()}`);
      const snapshot = await uploadBytes(imageRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error', 'Image upload failed.');
      return null;
    }
  };

  const handlePostDiary = async () => {
    if (!diaryText || !mood) {
      Alert.alert('Error', 'Please write your diary entry before posting.');
      return;
    }

    const imageUrl = await uploadImageToFirebase(imageUri);
    const newEntry = {
      text: diaryText,
      image: imageUrl,
      mood: mood,
      date: currentDate,
      email: auth.currentUser.email,
    };

    try {
      if (editingIndex !== null) {
        // Update existing entry
        const entryId = diaryEntries[editingIndex].id;
        await updateDoc(doc(db, 'diaries', entryId), newEntry);
        const updatedEntries = [...diaryEntries];
        updatedEntries[editingIndex] = { ...newEntry, id: entryId };
        setDiaryEntries(updatedEntries);
        Alert.alert('Success', 'Diary entry updated!');
      } else {
        // Add new entry
        await addDoc(collection(db, 'diaries'), newEntry);
        setDiaryEntries([...diaryEntries, newEntry]);
        Alert.alert('Success', 'Diary entry posted!');
      }
      resetDiaryInputs();
    } catch (error) {
      console.error('Error posting diary entry:', error);
      Alert.alert('Error', 'Failed to post diary entry.');
    }
  };

  const resetDiaryInputs = () => {
    setDiaryText('');
    setImageUri(null);
    setMood('');
    setShowAdditionalOptions(false);
    setEditingIndex(null);
  };

  useEffect(() => {
    const fetchDiaryHistory = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const diariesRef = collection(db, 'diaries');
          const q = query(diariesRef, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          const logs = [];
          querySnapshot.forEach((doc) => {
            logs.push({ id: doc.id, ...doc.data() });
          });
          setDiaryEntries(logs);
        }
      } catch (error) {
        console.error('Error fetching diary history:', error);
      }
    };
    fetchDiaryHistory();
  }, []);

  const handleEditDiary = (index) => {
    const entry = diaryEntries[index];
    setDiaryText(entry.text);
    setImageUri(entry.image);
    setMood(entry.mood);
    setEditingIndex(index);
    setShowAdditionalOptions(true);
  };

  const handleDeleteDiary = async (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'diaries', id));
              setDiaryEntries(diaryEntries.filter((entry) => entry.id !== id));
              Alert.alert('Success', 'Diary entry deleted.');
            } catch (error) {
              console.error('Error deleting diary entry:', error);
              Alert.alert('Error', 'Failed to delete diary entry.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handlePlayDiary = (text) => {
    Speech.speak(text);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'Students', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.name || ''); // Set the user's name
            setEmail(userData.email || '');   // Set the user's email
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

  return (
    <LinearGradient colors={['#F58426', '#a45dff']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {username}!</Text>
        </View>
        <Text style={styles.diaryHeading}>My Diary</Text>
        <View style={styles.diarySection}>
          <ScrollView style={styles.diaryContent}>
            {diaryEntries.length > 0 ? (
              diaryEntries.map((entry, index) => (
                <View key={index} style={styles.diaryEntry}>
                  <Text style={styles.entryText}>{entry.text}</Text>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Text style={styles.entryMood}>Feeling: {entry.mood || '❔'}</Text>
                  <Image source={entry.image ? { uri: entry.image } : require('../images/noImage.jpg')} style={styles.entryImage} />
                  
                  <View style={styles.entryActions}>
                    <TouchableOpacity onPress={() => handleEditDiary(index)} style={styles.actionButton}>
                      <Icon name="edit" size={20} color="#F58426" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePlayDiary(entry.text)} style={styles.actionButton}>
                      <Icon name="play" size={20} color="#F58426" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteDiary(entry.id)} style={styles.actionButton}>
                      <Icon name="trash" size={20} color="#F58426" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noEntriesText}>Start Today's Diary</Text>
            )}
          </ScrollView>
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

            <TouchableOpacity onPress={handlePostDiary} style={styles.button}>
              <Text style={styles.buttonText}>{editingIndex !== null ? 'Update Entry' : 'Post Entry'}</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.addEntryButton} onPress={() => setShowAdditionalOptions(!showAdditionalOptions)}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  addEntryButton: {
    backgroundColor: '#F58426',
    padding: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 16,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  noEntriesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,},

  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  diaryHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  diarySection: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  diaryContent: {
    maxHeight: 300,
  },
  diaryEntry: {
    padding: 10,
    marginVertical: 5,
  
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  entryText: {
    fontSize: 16,
    color: '#333',
  },
  entryDate: {
    fontSize: 12,
    color: '#888',
  },
  entryMood: {
    fontSize: 14,
    color: '#888',
  },
  entryImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 5,
  },
  noEntriesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
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
    height: 150,
    borderRadius: 10,
  },
  uploadText: {
    color: '#aaa',
  },
  moodChooser: {
    marginVertical: 10,
  },
  moodText: {
    fontSize: 16,
  },
  moodOptions: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  moodIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  selectedMood: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#F58426',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#F58426',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  
});

export default DigitalDiary;