import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ toggleMenu, isMenuOpen, closeMenu }) => {
  const navigation = useNavigation();

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
            <TouchableOpacity onPress={toggleMenu} style={styles.menuBtn}>
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
                <View style={styles.drawerMenu}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('PsyCadVideos')}
                  >
                    <Text style={styles.menuItemText}>Podcast and Videos</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('Therapy')}
                  >
                    <Text style={styles.menuItemText}>Therapy</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('HelpLine')}
                  >
                    <Text style={styles.menuItemText}>Help Line</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('ProfessionalMedicalHelp')}
                  >
                    <Text style={styles.menuItemText}>Professional Medical Help</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('CommunitySupport')}
                  >
                    <Text style={styles.menuItemText}>Community Support</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigateTo('PeerToPeerSupport')}
                  >
                    <Text style={styles.menuItemText}>Peer-to-Peer Support</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
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
    backgroundColor: '#FF6F00',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'flex-end', // Aligns the modal content to the bottom
  },
  drawerMenu: {
    backgroundColor: '#FF6F00',
    width: 250,
    height: '100%',
    padding: 10,
    position: 'absolute',
    right: 0, // Aligns the drawer content to the right
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
  },
  menuBtn: {
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  },
});

export default Header;