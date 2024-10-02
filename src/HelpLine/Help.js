import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 
import ProductsScreen from '../test2';
import Store from '../test';
import HomeScreen from '../CommunitySupport/HomeScreen';
const HelpLine = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={[styles.box, { backgroundColor: isDarkMode ? '#333' : '#FF6F00' }]}>
          <TouchableOpacity style={styles.contact} onPress={() => handleCall('+27115594555')}>
            <Icon name="phone" size={20} color={isDarkMode ? '#FFF' : '#FFF'} style={styles.icon} />
            <Text style={[styles.contactInfo, { color: isDarkMode ? '#FFF' : '#FFF' }]}>Telephone: +27 11 559 4555</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contact} onPress={() => handleCall('0820541137')}>
            <Icon name="phone" size={20} color={isDarkMode ? '#FFF' : '#FFF'} style={styles.icon} />
            <Text style={[styles.contactInfo, { color: isDarkMode ? '#FFF' : '#FFF' }]}>24 hour crisis: 082 054 1137</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contact} onPress={() => handleCall('112')}>
            <Icon name="phone" size={20} color={isDarkMode ? '#FFF' : '#FFF'} style={styles.icon} />
            <Text style={[styles.contactInfo, { color: isDarkMode ? '#FFF' : '#FFF' }]}>Emergency number: 112</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const handleCall = (phoneNumber) => {
  console.log(`Calling ${phoneNumber}`);
  Linking.openURL(`tel:${phoneNumber}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 60, // Add margin bottom to prevent overlap with Footer
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

export default HelpLine;
