import React from 'react';
import {  CheckBox, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TherapyType = () => {
    const [isSelected, setSelection] = React.useState(false);
    const navigation = useNavigation();

    const handleNavigateToDiary = () => {
        navigation.navigate('DigitalDiary');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../images/Icon.png')} style={styles.logo} />
                    <Text style={styles.logoText}>UJ WELLNESS</Text>
                </View>
                <TouchableOpacity style={styles.menuIcon}>
                    <Text style={styles.menuText}>☰</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>You deserve to be Happy</Text>
            <Text style={styles.subtitle}>What Type of Therapy are you looking for?</Text>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleNavigateToDiary}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonTitle}>Digital Diary</Text>
                            <Text style={styles.buttonSubtitle}>write on Journal</Text>
                        </View>
                        <Image source={require('../images/MainPage.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button1}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonTitle}>Online therapy</Text>
                            <Text style={styles.buttonSubtitle}>Meet with a professional </Text>
                            <Text style={styles.buttonSubtitle}>on a meeting</Text>
                        </View>
                        <Image source={require('../images/EntryDiary.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button2}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonTitle}>Peer2Peer Counseling</Text>
                            <Text style={styles.buttonSubtitle}>Meet with your peer mate</Text>
                            <Text style={styles.buttonSubtitle}>have a casual Conversation</Text>
                        </View>
                        <Image source={require('../images/TherapyPage.png')} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.checkboxContainer}>
                <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
                <Text style={styles.checkboxText}>Accept POPI ACT terms and conditions</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 110,
        height: 100,
    },
    logoText: {
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 0,
    },
    menuIcon: {
        padding: 10,
    },
    menuText: {
        fontSize: 24,
    },
    title: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    scrollContainer: {
        marginBottom: 20,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FBF1D7',
        padding: 10,
        marginBottom: 30,
        borderRadius: 10,
        width: 300,
        height: 100,
        justifyContent: 'space-between',
    },
    button1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F5DC',
        padding: 10,
        marginBottom: 30,
        borderRadius: 10,
        width: 300,
        height: 100,
        justifyContent: 'space-between',
    },
    button2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0DCC8',
        padding: 10,
        marginBottom: 30,
        borderRadius: 10,
        width: 300,
        height: 100,
        justifyContent: 'space-between',
    },
    buttonContent: {
        flexDirection: 'column',
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonSubtitle: {
        fontSize: 14,
        fontWeight: '300',
    },
    buttonIcon: {
        width: 130,
        height: 130,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default TherapyType;
