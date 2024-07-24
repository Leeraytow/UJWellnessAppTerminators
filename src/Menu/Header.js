import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (screen) => {
    closeMenu();
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image source={require('../images/logo.png')} style={styles.logo} />
              <Text style={styles.headerText}>UJWellness</Text>
            </View>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="menu" size={28} color="white" />

            </TouchableOpacity>
          </View>
          <Modal
            visible={isMenuOpen}
            transparent
            animationType="fade"
            onRequestClose={closeMenu}
          >
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.modalOverlay}>
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('PsyCadVideos')}
                  >
                    <Text style={styles.menuItemText}>Podcast and Videos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('Therapy')}
                  >
                    <Text style={styles.menuItemText}>Therapy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('HelpLine')}
                  >
                    <Text style={styles.menuItemText}>Help Line</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('ProfessionalMedicalHelp')}
                  >
                    <Text style={styles.menuItemText}>Professional Medical Help</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('CommunitySupport')}
                  >
                    <Text style={styles.menuItemText}>Community Support</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('PeerToPeerSupport')}
                  >
                     <Text style={styles.menuItemText}>PeerToPeer</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('Profile')}
                  >
                    <Text style={styles.menuItemText}>Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1,
  },
  header: {
    backgroundColor: '#FFA500',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Header;