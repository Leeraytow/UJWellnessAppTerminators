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
                    <Text style={styles.buttonText}>Start Video call with a therapist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start chatting with a therapist</Text>
                </TouchableOpacity>
            </View>
            <Footer /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },
    logo: {
        width: 50,
        height: 55,
        marginLeft: -20,
    },
    menuButton: {
        padding: 10,
    },
    menuText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    orangeContainer: {
        backgroundColor: '#f57c00',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '100%',
        marginBottom: 50,
        marginTop: 30, 
        height:400,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    bookingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default BookingCompleted;
