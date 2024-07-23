// TherapyButton.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import Emoji from './Emoji';

const TherapyButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const emotions = [
    { emoji: '😃', label: 'Excited', id: 1 },
    { emoji: '😊', label: 'Happy', id: 2 },
    { emoji: '😍', label: 'Loved', id: 3 },
    { emoji: '😐', label: 'Bored', id: 4 },
    { emoji: '😨', label: 'Anxious', id: 5 },
    { emoji: '😟', label: 'Worried', id: 6 },
    { emoji: '😠', label: 'Angry', id: 7 },
    { emoji: '😩', label: 'Frustrated', id: 8 },
    { emoji: '😢', label: 'Sad', id: 9 },
  ];

  const handleEmojiPress = (id) => {
    setSelectedEmotion(id);
    navigation.navigate('MoodControl', { selectedEmotion: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.container}>
          <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>How are you feeling right now?</Text>
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
          </ScrollView>
          <Footer />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default TherapyButton;
