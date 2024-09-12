import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';  // Import ThemeContext
import { FontSizeContext } from './FontSizeContext';  // Import FontSizeContext

const AccessibilitySettings = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);  // Access dark mode from context
  const { fontSize, increaseFontSize, decreaseFontSize } = useContext(FontSizeContext);  // Access font size context

  const [isLowVision, setIsLowVision] = React.useState(false);
  const [useScreenReader, setUseScreenReader] = React.useState(false);
  const [useVoiceCommands, setUseVoiceCommands] = React.useState(false);

  const adjustFontSize = value => {
    if (value > fontSize) {
      increaseFontSize();
    } else {
      decreaseFontSize();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
    >
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>
        <Text style={[styles.headerTitle, { fontSize, color: isDarkMode ? '#fff' : '#333' }]}>Accessibility Settings</Text>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { fontSize, color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Adjust Text Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={20}
          value={fontSize}
          step={1}
          onValueChange={adjustFontSize}
        />
        <Text style={[styles.label, { fontSize, color: isDarkMode ? '#fff' : '#333' }]}>Current Font Size: {fontSize}</Text>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { fontSize, color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Low Vision Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FFA500' }}
          thumbColor={isLowVision ? '#FFA500' : '#f4f3f4'}
          value={isLowVision}
          onValueChange={setIsLowVision}
        />
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { fontSize, color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Screen Reader</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FFA500' }}
          thumbColor={useScreenReader ? '#FFA500' : '#f4f3f4'}
          value={useScreenReader}
          onValueChange={setUseScreenReader}
        />
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { fontSize, color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Voice Commands</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FFA500' }}
          thumbColor={useVoiceCommands ? '#FFA500' : '#f4f3f4'}
          value={useVoiceCommands}
          onValueChange={setUseVoiceCommands}
        />
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { fontSize, color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Dark Theme</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FFA500' }}
          thumbColor={isDarkMode ? '#FFA500' : '#f4f3f4'}
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  setting: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 8,
  },
});

export default AccessibilitySettings;
