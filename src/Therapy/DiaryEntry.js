
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { useNavigation } from '@react-navigation/native';

const DiaryEntry = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    // Implement save functionality
    setModalVisible(false);
  };

  const handleDelete = () => {
    // Implement delete functionality
    setModalVisible(false);
  };

  const handleSend = () => {
    // Implement send functionality
    setModalVisible(false);
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji);
    setEmojiPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Moment</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="check" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <Image source={require('../images/coffee.jpeg')} style={styles.image} />
      )}
      <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Journaling Techniques for Gratitude</Text>
        <Text style={styles.subtitle}>
          A gratitude journal offers a simple yet effective way to cultivate positivity and improve your overall well-being.
          By regularly reflecting on what you are grateful for, you can shift your perspective to focus on all the good things
          in your life.
        </Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your thoughts here..."
          value={text}
          onChangeText={setText}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setEmojiPickerVisible(true)}>
          <Icon name="emoticon-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePicker}>
          <Icon name="image-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Icon name="microphone-outline" size={24} color="#000" />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="dots-horizontal" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity style={[styles.modalButton, styles.saveButtonStyle]} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.deleteButtonStyle]} onPress={handleDelete}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.sendButtonStyle]} onPress={handleSend}>
              <Text style={styles.modalButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButtonStyle]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {emojiPickerVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={emojiPickerVisible}
          onRequestClose={() => setEmojiPickerVisible(false)}
        >
          <View style={styles.emojiPickerContainer}>
            <EmojiSelector
              onEmojiSelected={handleEmojiSelect}
              category={Categories.symbols}
            />
            <TouchableOpacity
              style={styles.emojiPickerCloseButton}
              onPress={() => setEmojiPickerVisible(false)}
            >
              <Text style={styles.emojiPickerCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5DC',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 230,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView:
{
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  saveButtonStyle: {
    backgroundColor: '#E0DCC8',
  },
  deleteButtonStyle: {
    backgroundColor: '#F44336',
  },
  sendButtonStyle: {
    backgroundColor: '#E0DCC8',
  },
  cancelButtonStyle: {
    backgroundColor: '#CCC',
  },
  emojiPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  emojiPickerCloseButton: {
    marginTop: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
  emojiPickerCloseButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default DiaryEntry;
