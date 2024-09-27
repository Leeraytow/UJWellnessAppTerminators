import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Students"));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserPress = (user) => {
    navigation.navigate('Chat', { selectedUser: user });
  };

  const handleImagePress = (userId) => {
    navigation.navigate('UserProfile', { userId });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleUserPress(item)}
      style={[styles.userItem, { backgroundColor: isDarkMode ? '#333' : '#FFF' }]}
    >
      <TouchableOpacity onPress={() => handleImagePress(item.id)}>
        <Image
          source={{ uri: item.profileImage }}
          style={[styles.avatar, { borderColor: isDarkMode ? '#FFA500' : '#FF6F00' }]}
        />
      </TouchableOpacity>
      <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#333' }]}>
        {item.id === auth.currentUser.email ? 'Myself' : item.name}
      </Text>
      {item.active && (
        <View style={styles.activeDot} />
      )}
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#F5F5F5' }]}>
<View style={[styles.header, { backgroundColor: isDarkMode ? '#444' : '#FF5733' }]}>
        <Text style={styles.headerTitle}>UJWellness Chat</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#FF5733',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    marginLeft: 8,
  },
  
});

export default UserList;