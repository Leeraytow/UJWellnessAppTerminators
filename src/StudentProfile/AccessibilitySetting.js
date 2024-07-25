import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AccessibilitySettings = () => {
  const navigation = useNavigation();
  const [isLowVision, setIsLowVision] = useState(false);
  const [useScreenReader, setUseScreenReader] = useState(false);
  const [useVoiceCommands, setUseVoiceCommands] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F00" />
        </Pressable>
        <Text style={styles.headerTitle}>Accessibility Settings</Text>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Visual Impairment Details</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Low Vision</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={isLowVision ? '#FFA500' : '#f4f3f4'}
            value={isLowVision}
            onValueChange={setIsLowVision}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Preferred Accessibility Tools</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Screen Reader</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={useScreenReader ? '#FFA500' : '#f4f3f4'}
            value={useScreenReader}
            onValueChange={setUseScreenReader}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Voice Commands</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={useVoiceCommands ? '#FFA500' : '#f4f3f4'}
            value={useVoiceCommands}
            onValueChange={setUseVoiceCommands}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Color Contrast Adjustment</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>High Contrast Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={highContrast ? '#FFA500' : '#f4f3f4'}
            value={highContrast}
            onValueChange={toggleHighContrast}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Theme</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Dark Theme</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={darkTheme ? '#FFA500' : '#f4f3f4'}
            value={darkTheme}
            onValueChange={toggleDarkTheme}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
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
    color: '#333',
    marginLeft: 16,
  },
  setting: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
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
    color: '#FF6F00',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default AccessibilitySettings;
