import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function DigitalDiary() {
  const [showOptions, setShowOptions] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Moment</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => setShowOptions(!showOptions)}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.optionsMenu}>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePlaceholder} />
          ) : (
            <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
              <Ionicons name="image" size={50} color="grey" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>Journaling Techniques for Gratitude</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="This Digital Diary offers a simple yet effective way to express your emotions, write how you feel and don't forget to hit the send button. One of our professionals will soon reach out to you."
        />
      </ScrollView>
      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="happy-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Ionicons name="attach-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="send-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF1D7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsButton: {
    padding: 5,
  },
  optionsMenu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 10,
  },
  optionItem: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  iconButton: {
    padding: 10,
  },
});
