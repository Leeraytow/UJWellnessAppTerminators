import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Emergency = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.contact} onPress={() => handleCall('+27115594555')}>
          <Icon name="phone" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.contactInfo}>Telephone: +27 11 559 4555</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contact} onPress={() => handleCall('0820541137')}>
          <Icon name="phone" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.contactInfo}>24 hour crisis: 082 054 1137</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contact} onPress={() => handleCall('112')}>
          <Icon name="phone" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.contactInfo}>Emergency number: 112</Text>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#FFA500',
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
    color: '#FFF',
  },
});

export default Emergency;
