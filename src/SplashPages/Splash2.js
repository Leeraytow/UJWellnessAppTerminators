import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen2 = () => {
    const navigation = useNavigation();

    const handleNextPress = () => {
        navigation.navigate('SplashScreen3');
    };

    const handleSkipPress = () => {
        navigation.navigate('WelcomeScreen');
    };

    return (
        <ImageBackground source={require('../images/background.png')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../images/UJ.png')} style={styles.logo} />
                <View style={styles.logoContainer}>
                    <Image source={require('../images/logo.png')} style={styles.logoPic} />
                    <Text style={styles.head}>UJ Wellness</Text>
                </View>
                <Image source={require('../images/psycad.png')} style={styles.psycad} />
                <Image source={require('../images/ChatVideo img.png')} style={styles.pic} />
                <View style={styles.message}>
                    <Text style={styles.heading}>You Are Not Alone</Text>
                    <Text style={styles.txtmessage}>Welcome to our mental health app designed for students, offering a safe space to explore wellness strategies and seek support.</Text>
                </View>
                <TouchableOpacity style={styles.next} onPress={handleNextPress}>
                    <Text style={styles.txtNext}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skip} onPress={handleSkipPress}>
                    <Text style={styles.txtSkip}>Skip</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 50,
        left: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logoPic: {
        width: 100,
        height: 100,
    },
    head: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
    },
    psycad: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 50,
        right: 20,
    },
    pic: {
        marginTop: -50,
    },
    message: {
        backgroundColor: '#CC5500',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
        width: '80%',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    txtmessage: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    next: {
        bottom: 50,
        position: 'absolute',
        left: 50,
        backgroundColor: '#CC5500',
        padding: 10,
        borderRadius: 5,
        marginTop: 2,
    },
    skip: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        backgroundColor: '#CC5500',
        padding: 10,
        borderRadius: 5,
    },
    txtSkip: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    txtNext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default SplashScreen2;
