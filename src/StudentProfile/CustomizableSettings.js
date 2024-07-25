import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomizableSettings = () => {
  const navigation = useNavigation();
  const [sessionReminders, setSessionReminders] = useState(false);
  const [wellnessTips, setWellnessTips] = useState(false);
  const [anonymity, setAnonymity] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FF6F00" />
        </Pressable>
        <Text style={styles.headerTitle}>Customizable Settings</Text>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Notification Preferences</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Session Reminders</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={sessionReminders ? '#FFA500' : '#f4f3f4'}
            value={sessionReminders}
            onValueChange={setSessionReminders}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Wellness Tips</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FFA500' }}
            thumbColor={wellnessTips ? '#FFA500' : '#f4f3f4'}
            value={wellnessTips}
            onValueChange={setWellnessTips}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Privacy Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Anonymity Options</Text>
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

export default CustomizableSettings;
