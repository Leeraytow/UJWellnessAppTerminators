import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';
import Header from './Header';
import Footer from './Footer';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Students"));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Set all users data directly
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    const updateLastSeen = async () => {
      const userRef = doc(db, "Students", auth.currentUser.email); // Assuming the document ID is the email
      await updateDoc(userRef, {
        lastSeen: serverTimestamp(), // Update lastSeen to current timestamp
      });
    };

    fetchUsers();
    updateLastSeen(); // Call the function to update last seen
  }, []);

  const handleUserPress = (user) => {
    navigation.navigate('Chat', { selectedUser: user });
  };

  const handleImagePress = (userId) => {
    navigation.navigate('UserProfile', { userId });
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(user => (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()));

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
      <View style={styles.userInfo}>
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#333' }]}>
          {item.id === auth.currentUser.email ? 'Me, Myself and I' : item.name}
        </Text>
        {/* Display the last seen timestamp */}
        <Text style={[styles.lastSeen, { color: isDarkMode ? '#AAA' : '#666' }]}>
          Last seen {item.lastSeen ? new Date(item.lastSeen.seconds * 1000).toLocaleString() : 'a few minutes ago'}
        </Text>
      </View>
      {item.active && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#F5F5F5' }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: isDarkMode ? '#444' : '#FFF', color: isDarkMode ? '#FFF' : '#333' }]}
          placeholder="Search contacts..."
          placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  list: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  lastSeen: {
    fontSize: 14,
    marginTop: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
    position: 'absolute',
    top: 20,
    right: 16,
  },
});

export default UserList;
