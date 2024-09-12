import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerContent = ({ navigation }) => (
  <View style={styles.drawerContent}>
    <TouchableOpacity onPress={() => navigation.navigate('PsyCadVideos')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Podcast and Videos</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Therapy')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Therapy</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('HelpLine')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Help Line</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('ProfessionalMedicalHelp')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Professional Medical Help</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('CommunitySupport')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Community Support</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('PeerToPeerSupport')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Peer-to-Peer Support</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.menuItem}>
      <Text style={styles.menuItemText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../images/logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>UJWellness</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Drawer Navigator */}
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#FF6F00',
            width: 250,
          },
        }}
      >
        {/* Stack.Screen components here if needed */}
        {/* Example */}
        <Drawer.Screen name="MainPage" component={MainPage} />
        {/* Add other screens as needed */}
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
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
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FF6F00',
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
});

export default Header;
