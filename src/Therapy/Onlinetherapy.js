import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 

const BookingCompleted = () => {
    const { isDarkMode } = useContext(ThemeContext); 

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f5f5f5' }]}>
            <View style={[styles.header, { backgroundColor: isDarkMode ? '#333' : '#FF6F00' }]}>
                <Image
                    source={require('../images/Icon.png')}
                    style={styles.logo}
                />
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#fff' }]}>☰</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={[styles.orangeContainer, { backgroundColor: isDarkMode ? '#444' : '#FF6F00' }]}>
                    <Image
                        source={require('../images/ChatVideo img.png')}
                        style={styles.image}
                    />
                    <Text style={[styles.bookingText, { color: isDarkMode ? '#fff' : '#fff' }]}>Booking Completed</Text>
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#FF6F00' }]}>
                    <Text style={styles.buttonText}>Start Video Call with a Therapist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#FF6F00' }]}>
                    <Text style={styles.buttonText}>Start Chatting with a Therapist</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    menuButton: {
        padding: 10,
    },
    menuText: {
        fontSize: 24,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    orangeContainer: {
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        width: '100%',
        marginBottom: 40,
        height: 350,
        justifyContent: 'center',
    },
    image: {
        width: 180,
        height: 180,
        marginBottom: 20,
    },
    bookingText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingCompleted;
