import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext'; 

const CustomizableSettings = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [sessionReminders, setSessionReminders] = React.useState(false);
  const [wellnessTips, setWellnessTips] = React.useState(false);
  const [anonymity, setAnonymity] = React.useState(false);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFA500' : '#FF6F00'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#333' }]}>Customizable Settings</Text>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Notification Preferences</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Session Reminders</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={sessionReminders ? '#FFA500' : '#f4f3f4'}
            value={sessionReminders}
            onValueChange={setSessionReminders}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Wellness Tips</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={wellnessTips ? '#FFA500' : '#f4f3f4'}
            value={wellnessTips}
            onValueChange={setWellnessTips}
          />
        </View>
      </View>

      <View style={[styles.setting, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFA500' : '#FF6F00' }]}>Privacy Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#333' }]}>Anonymity Options</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={anonymity ? '#FFA500' : '#f4f3f4'}
            value={anonymity}
            onValueChange={setAnonymity}
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

export default CustomizableSettings;
