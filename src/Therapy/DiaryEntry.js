import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import EmojiSelector from 'react-native-emoji-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 
import { FontSizeContext } from '../StudentProfile/FontSizeContext';
import Header from '../Menu/Header'; // Import Header

export default function DigitalDiary({ navigation }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const { fontSize } = useContext(FontSizeContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Load entries from AsyncStorage on component mount
  useEffect(() => {
    loadEntries();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Image Picker Logic
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need media library permissions to select an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Save the diary entry
  const saveEntry = async () => {
    if (text.trim() === '' && !image) {
      Alert.alert('Cannot Save', 'Please add text or an image to save.');
      return;
    }

    const newEntry = { text, image, date: new Date().toISOString() };
    const updatedEntries = [newEntry, ...entries];

    setEntries(updatedEntries);
    await AsyncStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));  // Save entries to AsyncStorage

    Alert.alert('Saved', 'Your diary entry has been saved successfully!');
    setText('');
    setImage(null);
  };

  // Load saved entries from AsyncStorage
  const loadEntries = async () => {
    const savedEntries = await AsyncStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#FAFAFA' }]}>
      {/* Import Header */}
      <Header navigation={navigation} title="New Moment" />

      <Animated.View style={[{ opacity: fadeAnim }, styles.contentWrapper]}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.diaryContainer, { borderColor: isDarkMode ? '#FF6F00' : '#FF6F00' }]}>
            <View style={[styles.imageContainer, { borderColor: isDarkMode ? '#444' : '#E0E0E0' }]}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <TouchableOpacity
                  style={[styles.imagePlaceholder, { backgroundColor: isDarkMode ? '#555' : '#E0E0E0' }]}
                  onPress={pickImage}
                >
                  <Ionicons name="image" size={50} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
                  <Text style={[styles.imagePlaceholderText, { color: isDarkMode ? '#FF6F00' : '#FF6F00', fontSize }]}>
                    Add Image
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TextInput
              style={[styles.textInput, { backgroundColor: isDarkMode ? '#333' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
              multiline
              placeholder="Write your thoughts and hit Send."
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={text}
              onChangeText={setText}
            />
          </View>
        </ScrollView>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <EmojiSelector
            onEmojiSelected={(emoji) => setText((prev) => prev + emoji)}
            showSearchBar={false}
            columns={8}
            category="smileys"
          />
        )}
      </Animated.View>

      {/* WhatsApp-like Bottom Bar */}
      <View style={[styles.bottomBar, { backgroundColor: isDarkMode ? '#222' : '#FFF' }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Ionicons name="happy-outline" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
        </TouchableOpacity>

        <TextInput
          style={[styles.inputField, { backgroundColor: isDarkMode ? '#333' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }]}
          placeholder="Type a message"
          placeholderTextColor={isDarkMode ? '#999' : '#999'}
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Ionicons name="attach-outline" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={saveEntry}>
          <Ionicons name="send-outline" size={24} color={isDarkMode ? '#FF6F00' : '#FF6F00'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 20,
  },
  diaryContainer: {
    margin: 20,
    padding: 20,
    borderWidth: 2,
    borderRadius: 15,  // Rounded corners for a more diary-like look
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,  // Android shadow
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    padding: 50,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
  },
  iconButton: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 10,
  },
});
