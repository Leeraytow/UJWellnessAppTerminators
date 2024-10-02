import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import Dialog from 'react-native-dialog';
import call from 'react-native-phone-call';
import Footer from '../Menu/Footer';
import Header from '../Menu/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const EmergencyContact = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade value

  const emergencyContacts = [
    { category: '24 Hour Crisis Lines', icon: 'phone-in-talk', contacts: [{ name: 'PsyCaD', number: '+27 82 054 1137' }, { name: 'Flying Squad', number: '+27 10111' }] },
    { category: 'Protection Services', icon: 'security', contacts: [{ name: 'APB', number: '+27 11 559 1312' }, { name: 'APK', number: '+27 11 559 2555' }, { name: 'DFC', number: '+27 11 559 6450' }, { name: 'SWC', number: '+27 11 559 5555' }] },
    { category: 'Hospitals', icon: 'local-hospital', contacts: [{ name: 'Netcare', number: '+27 82111' }, { name: 'Milpark Hospital', number: '+27 11 480 5600' }, { name: 'Garden City Hospital', number: '+27 11 437 5000' }, { name: 'Helen Joseph Hospital', number: '+27 11 489 1011' }, { name: 'Meldene Medicross', number: '+27 114 822291' }] },
    { category: 'Campus Health Service', icon: 'health-and-safety', contacts: [{ name: 'APB', number: '+27 11 559 1238' }, { name: 'APK', number: '+27 11 559 3837' }, { name: 'DFC', number: '+27 11 559 6544' }, { name: 'SWC', number: '+27 11 559 5571' }] },
    { category: 'Accommodation', icon: 'home', contacts: [{ name: 'Residence Administration', number: '+27 11 559 2986' }, { name: 'Accredited off-campus', number: '+27 11 559 3709' }] }
  ];

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
    setIsDialogVisible(true);
  };

  const confirmCall = () => {
    setIsDialogVisible(false);
    if (selectedContact) {
      const args = {
        number: selectedContact.number,
        prompt: true,
      };
      call(args).catch(console.error);
    }
  };

  // Animating contacts fade in
  const fadeInContacts = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // Render each contact item with press animation
  const renderContactItem = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.contactItem}>
      <TouchableOpacity onPress={() => handleContactPress(item)} activeOpacity={0.7}>
        <View style={styles.contactRow}>
          <Icon name="phone" size={24} color="#fff" style={styles.iconStyle} />
          <View>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactNumber}>{item.number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  // Render each category with its icon
  const renderCategory = ({ item }) => (
    <View style={styles.category}>
      <View style={styles.categoryTitleRow}>
        <Icon name={item.icon} size={28} color="#FF7043" style={styles.iconStyle} />
        <Text style={styles.categoryTitle}>{item.category}</Text>
      </View>
      <FlatList
        data={item.contacts}
        renderItem={renderContactItem}
        keyExtractor={(contact) => contact.number}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Full-width Header */}
        <View style={styles.headerFooter}>
          <Header />
        </View>

        {/* Main Content */}
        <FlatList
          data={emergencyContacts}
          renderItem={renderCategory}
          keyExtractor={(item) => item.category}
          contentContainerStyle={styles.flatListContent}
          onLayout={fadeInContacts} // Triggers fade animation when list loads
        />

        {/* Dialog for Call Confirmation */}
        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Confirm Call</Dialog.Title>
          <Dialog.Description>
            Do you want to call {selectedContact?.name} at {selectedContact?.number}?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => setIsDialogVisible(false)} />
          <Dialog.Button label="Call" onPress={confirmCall} />
        </Dialog.Container>

        {/* Full-width Footer */}
        <View style={styles.headerFooter}>
          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5E5', // Light background
  },
  container: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headerFooter: {
    width: '100%',
  },
  category: {
    marginBottom: 30,
    backgroundColor: '#FFEBE0',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#FF8C42',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF7043',
    marginLeft: 8,
  },
  contactItem: {
    backgroundColor: '#FC9842',
    padding: 18,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#FF7043',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  contactNumber: {
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
  },
  iconStyle: {
    marginRight: 12,
  },
});

export default EmergencyContact;
