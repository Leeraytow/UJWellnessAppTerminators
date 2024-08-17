import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from './ThemeContext'; // Adjust the path if necessary

const Emergency = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <View style={[styles.box, { backgroundColor: isDarkMode ? '#555' : '#FFA500' }]}>
        <TouchableOpacity style={styles.contact} onPress={() => handleCall('+27115594555')}>
          <Icon name="phone" size={20} color={isDarkMode ? '#000' : '#FFF'} style={styles.icon} />
          <Text style={[styles.contactInfo, { color: isDarkMode ? '#fff' : '#FFF' }]}>Telephone: +27 11 559 4555</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contact} onPress={() => handleCall('0820541137')}>
          <Icon name="phone" size={20} color={isDarkMode ? '#000' : '#FFF'} style={styles.icon} />
          <Text style={[styles.contactInfo, { color: isDarkMode ? '#fff' : '#FFF' }]}>24 hour crisis: 082 054 1137</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contact} onPress={() => handleCall('112')}>
          <Icon name="phone" size={20} color={isDarkMode ? '#000' : '#FFF'} style={styles.icon} />
          <Text style={[styles.contactInfo, { color: isDarkMode ? '#fff' : '#FFF' }]}>Emergency number: 112</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const handleCall = (phoneNumber) => {
  console.log(`Calling ${phoneNumber}`);
  Linking.openURL(`tel:${phoneNumber}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  contactInfo: {
    fontSize: 18,
  },
});

export default Emergency;
