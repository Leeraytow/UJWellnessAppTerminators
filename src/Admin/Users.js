import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loggedInAdminEmail, setLoggedInAdminEmail] = useState('');
  const { isDarkMode } = useContext(ThemeContext); // Use theme context

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'Students'));
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    const fetchLoggedInAdminEmail = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setLoggedInAdminEmail(currentUser.email);
      }
    };

    fetchUsers();
    fetchLoggedInAdminEmail();
  }, []);

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'Students', userId));
              setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
              console.error("Error deleting user: ", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFA500' : '#333' }]}>User Management</Text>
      <View style={styles.table}>
        <View style={[styles.tableHeader, { borderBottomColor: isDarkMode ? '#555' : '#ddd' }]}>
          <Text style={[styles.headerText, { width: '35%', color: isDarkMode ? '#FFA500' : '#333' }]}>Email</Text>
          <Text style={[styles.headerText, { color: isDarkMode ? '#FFA500' : '#333' }]}>Username</Text>
          <Text style={[styles.headerText, { color: isDarkMode ? '#FFA500' : '#333' }]}>Delete</Text>
        </View>
        {users
          .filter(user => user.email !== loggedInAdminEmail)
          .map(user => (
            <View key={user.id} style={[styles.tableRow, { borderBottomColor: isDarkMode ? '#555' : '#ddd' }]}>
              <Text style={[styles.rowText, { width: '35%', color: isDarkMode ? '#ddd' : '#333' }]}>{user.email}</Text>
              <Text style={[styles.rowText, { color: isDarkMode ? '#ddd' : '#333' }]}>{user.name}</Text>
              <View style={styles.deleteButtonContainer}>
                <Button
                  title="Delete"
                  color={isDarkMode ? 'lightcoral' : 'red'}
                  onPress={() => handleDeleteUser(user.id)}
                />
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  rowText: {
    width: '30%',
    textAlign: 'center',
  },
  deleteButtonContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Users;
