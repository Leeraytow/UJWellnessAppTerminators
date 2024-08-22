import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 

const AdminSettings = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [isLowVision, setIsLowVision] = React.useState(false);
  const [useScreenReader, setUseScreenReader] = React.useState(false);
  const [useVoiceCommands, setUseVoiceCommands] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#333' }]}>Accessibility Settings</Text>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Visual Impairment Details</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Low Vision</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={isLowVision ? '#FFA500' : '#f4f3f4'}
            value={isLowVision}
            onValueChange={setIsLowVision}
          />
        </View>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Preferred Accessibility Tools</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Screen Reader</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={useScreenReader ? '#FFA500' : '#f4f3f4'}
            value={useScreenReader}
            onValueChange={setUseScreenReader}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Voice Commands</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={useVoiceCommands ? '#FFA500' : '#f4f3f4'}
            value={useVoiceCommands}
            onValueChange={setUseVoiceCommands}
          />
        </View>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Color Contrast Adjustment</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>High Contrast Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={highContrast ? '#FFA500' : '#f4f3f4'}
            value={highContrast}
            onValueChange={toggleHighContrast}
          />
        </View>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Theme</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Dark Theme</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={isDarkMode ? '#FFA500' : '#f4f3f4'}
            value={isDarkMode}
            onValueChange={toggleTheme}
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default AdminSettings;
