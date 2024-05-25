import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen1 = () => {
    const navigation = useNavigation();
    const translateYAnim = useRef(new Animated.Value(-200)).current;
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('SplashScreen2');
        }, 4000);
        return () => clearTimeout(timer);
    }, []); 

    useEffect(() => {
        const animateImage = () => {
            Animated.spring(translateYAnim, {
                toValue: 0,
                tension: 10,
                friction: 4,
                useNativeDriver: true,
            }).start();
        };

        const spinIcon = () => {
            Animated.loop(
                Animated.timing(
                    spinValue,
                    {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }
                )
            ).start();
        };

        animateImage();
        spinIcon();
    }, []); 

    const handleGetStarted = () => {
        navigation.navigate('SplashScreen2');
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ImageBackground source={require('../images/background.png')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../images/UJ.png')} style={styles.logo}/>
                <View>
                    <Animated.Image
                        source={require('../images/Icon.png')} style={[styles.icon, { transform: [{ rotate: spin }] }]}
                    />
                </View>
                <View style={styles.lineContainer}>
                    <View style={styles.lineHalfOrange} />
                    <View style={styles.lineHalfBlack} />
                </View>
                <Text style={styles.text}>
                    Welcome to <Text style={styles.txtcol}>UJ Wellness!</Text>
                </Text>
                <Animated.Image 
                    source={require('../images/psycad.png')} 
                    style={[styles.psycad, { transform: [{ translateY: translateYAnim }] }]} 
                />

                <TouchableOpacity style={styles.btn} onPress={handleGetStarted}>
                    <Text style={styles.txtbtn}>Get Started</Text>
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(240, 240, 240, 0.5)', 
    },
    logo: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 40,
        left: 20,
    },
    lineContainer: {
        flexDirection: 'row',
        width: '80%',
        height: 10,
        marginVertical: 20,
        borderRadius: 20,
    },
    lineHalfOrange: {
        flex: 1,
        backgroundColor: 'orange',
    },
    lineHalfBlack: {
        flex: 1,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    txtcol: {
        color: 'orange',
    },
    icon: {
        width: 200,
        height: 250,
    },
    psycad: {
        width: 150,
        height: 150,
    },
    btn: {
        top: 100,
    },
    txtbtn: {
        fontSize: 20,
    },
});

export default SplashScreen1;
