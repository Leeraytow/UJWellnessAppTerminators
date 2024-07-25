import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import EmojiSelector from 'react-native-emoji-selector';

export default function DigitalDiary({ navigation }) {
  const [showOptions, setShowOptions] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
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

  const startRecording = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        Alert.alert('Permission to access microphone is required!');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    Alert.alert('Recording completed', `Audio saved to ${uri}`);
  };

  const handleSend = () => {
    Alert.alert('Sent', 'Your entry has been sent successfully!');
    setText('');
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Moment</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => setShowOptions(!showOptions)}>
          <MaterialIcons name="more-vert" size={24} color="#FF6F00" />
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
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
              <Ionicons name="image" size={50} color="#FF6F00" />
              <Text style={styles.imagePlaceholderText}>Add Image</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>Journaling Techniques for Digital Therapy</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="This Digital Diary offers a simple yet effective way to express your emotions. Write how you feel and hit the send button. One of our professionals will soon reach out to you."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        {showEmojiPicker && (
          <EmojiSelector
            onEmojiSelected={emoji => setText(prev => prev + emoji)}
            showSearchBar={false}
            columns={8}
          />
        )}
      </ScrollView>
      <View style={styles.bottomIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Ionicons name="happy-outline" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Ionicons name="attach-outline" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <Ionicons name="mic-outline" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Ionicons name="send-outline" size={24} color="#FF6F00" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light cream background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20, // Add margin to move the header downwards
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F00', // Orange shade
  },
  optionsButton: {
    padding: 5,
  },
  optionsMenu: {
    position: 'absolute',
    top: 55,
    right: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Border around the container
    borderRadius: 10,
    padding: 10,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6F00', // Orange border
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Border around the image
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#FF6F00',
    marginTop: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Border below the title
    paddingBottom: 5,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  iconButton: {
    padding: 10,
  },
});
