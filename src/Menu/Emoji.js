// Emoji.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Emoji = ({ emoji, label, onPress, isSelected }) => (
  <TouchableOpacity onPress={onPress} style={[styles.emojiContainer, isSelected && styles.selectedEmoji]}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  emojiContainer: {
    alignItems: 'center',
    margin: 5,
    width: '28%',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedEmoji: {
    backgroundColor: '#f0f0f0',
  },
  emoji: {
    fontSize: 54,
  },
  label: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Emoji;
