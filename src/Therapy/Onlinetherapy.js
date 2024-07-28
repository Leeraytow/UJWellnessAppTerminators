import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../Menu/Footer';

const BookingCompleted = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../images/Icon.png')}
                    style={styles.logo}
                />
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.orangeContainer}>
                    <Image
                        source={require('../images/ChatVideo img.png')}
                        style={styles.image}
                    />
                    <Text style={styles.bookingText}>Booking Completed</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start Video Call with a Therapist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#FF6F00',
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
        color: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    orangeContainer: {
        backgroundColor: '#FF6F00',
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
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#FF6F00',
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
