import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Footer from '../Menu/Footer';
import { ThemeContext } from '../StudentProfile/ThemeContext'; 
import Header from '../Menu/Header';
import { LinearGradient } from 'expo-linear-gradient';

const psychologists = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialization: 'Cognitive Behavioral Therapy',
        experience: '15 years',
        rating: 4.9,
        availability: 'Mon-Fri',
        education: 'Ph.D. in Clinical Psychology',
        sessions: 'Online & In-person'
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        specialization: 'Child Psychology',
        experience: '12 years',
        rating: 4.8,
        availability: 'Tue-Sat',
        education: 'Ph.D. in Child Development',
        sessions: 'In-person only'
    },
    {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        specialization: 'Anxiety & Depression',
        experience: '10 years',
        rating: 4.7,
        availability: 'Mon-Thu',
        education: 'Psy.D. Clinical Psychology',
        sessions: 'Online only'
    },
    {
        id: 4,
        name: 'Dr. James Wilson',
        specialization: 'Family Therapy',
        experience: '20 years',
        rating: 4.9,
        availability: 'Wed-Sun',
        education: 'Ph.D. in Family Psychology',
        sessions: 'Online & In-person'
    }
];

const ProfessionalSupport = () => {
    const navigation = useNavigation(); 
    const { isDarkMode } = useContext(ThemeContext); 

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#222' : '#f5f5f5' }]}>
             <Header />
            
            <ScrollView style={styles.content}>
                <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                    Available Psychologists
                </Text>
                
                {psychologists.map((psych) => (
                    <View key={psych.id} style={[
                        styles.psychCard,
                        { backgroundColor: isDarkMode ? '#444' : '#fff' }
                    ]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarText}>
                                    {psych.name.split(' ').map(n => n[0]).join('')}
                                </Text>
                            </View>
                            <View style={styles.headerInfo}>
                                <Text style={[styles.psychName, { color: isDarkMode ? '#fff' : '#000' }]}>
                                    {psych.name}
                                </Text>
                                <Text style={[styles.specialization, { color: isDarkMode ? '#ddd' : '#666' }]}>
                                    {psych.specialization}
                                </Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>⭐ {psych.rating}</Text>
                            </View>
                        </View>

                        <View style={styles.detailsContainer}>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, { color: isDarkMode ? '#ddd' : '#666' }]}>
                                    Experience
                                </Text>
                                <Text style={[styles.detailValue, { color: isDarkMode ? '#fff' : '#000' }]}>
                                    {psych.experience}
                                </Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, { color: isDarkMode ? '#ddd' : '#666' }]}>
                                    Availability
                                </Text>
                                <Text style={[styles.detailValue, { color: isDarkMode ? '#fff' : '#000' }]}>
                                    {psych.availability}
                                </Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, { color: isDarkMode ? '#ddd' : '#666' }]}>
                                    Sessions
                                </Text>
                                <Text style={[styles.detailValue, { color: isDarkMode ? '#fff' : '#000' }]}>
                                    {psych.sessions}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => navigation.navigate('VideoCall')}
                            >
                                <LinearGradient
                                    colors={['#FC9842', '#FE5F75']} // Therapy button gradient colors
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Video Call</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => navigation.navigate('Chat')}
                            >
                                <LinearGradient
                                    colors={['#FC9842', '#FE5F75']} // Therapy button gradient colors
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Chat</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    psychCard: {
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF6F00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    psychName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    specialization: {
        fontSize: 14,
    },
    ratingContainer: {
        backgroundColor: '#FFF9C4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF8F00',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfessionalSupport;
