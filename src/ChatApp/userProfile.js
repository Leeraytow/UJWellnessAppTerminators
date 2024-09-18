import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Configuration/firebase';
import { ThemeContext } from '../StudentProfile/ThemeContext';

const UserProfile = ({ route }) => {
    const { userName } = route.params; // The name of the user passed from UserList
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userName) {
                    console.error("userName is undefined");
                    return;
                }

                // Fetch user data based on name
                const userQuery = query(collection(db, 'Students'), where('name', '==', userName));
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    setUserData(userSnapshot.docs[0].data());
                } else {
                    console.error("No user found with the given name.");
                }

                // Fetch user posts
                const postsQuery = query(collection(db, 'Posts'), where('userName', '==', userName));
                const postsSnapshot = await getDocs(postsQuery);
                const posts = postsSnapshot.docs.map(doc => doc.data());
                setUserPosts(posts);

            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUserData();
    }, [userName]);

    if (!userData) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#FFF' }]}>
            <View style={styles.profileContainer}>
                <Image 
                    source={{ uri: userData.profileImage || require('../images/profile.png') }} 
                    style={styles.avatar} 
                />
                <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#333' }]}>{userData.name || 'No Name'}</Text>
                <Text style={[styles.detail, { color: isDarkMode ? '#CCC' : '#555' }]}>Gender: {userData.gender || 'N/A'}</Text>
                <Text style={[styles.detail, { color: isDarkMode ? '#CCC' : '#555' }]}>Age: {userData.age || 'N/A'}</Text>
                <Text style={[styles.detail, { color: isDarkMode ? '#CCC' : '#555' }]}>Date of Birth: {userData.dob || 'N/A'}</Text>
            </View>
            <Text style={[styles.postsHeader, { color: isDarkMode ? '#FFF' : '#333' }]}>Posts</Text>
            <FlatList
                data={userPosts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={[styles.postText, { color: isDarkMode ? '#FFF' : '#333' }]}>{item.text || 'No Content'}</Text>
                    </View>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 16,
        marginBottom: 8,
    },
    postsHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    postContainer: {
        padding: 16,
        backgroundColor: '#EEE',
        borderRadius: 8,
        marginBottom: 8,
    },
    postText: {
        fontSize: 16,
    },
});

export default UserProfile;
