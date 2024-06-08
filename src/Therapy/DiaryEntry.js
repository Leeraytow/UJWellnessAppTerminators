
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DiaryEntry = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSave = () => {

        setModalVisible(false);
    };

    const handleDelete = () => {

        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Moment</Text>
                <TouchableOpacity style={styles.saveButton}>
                    <Icon name="check" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <Image source={require('../images/coffee.jpeg')} style={styles.image} />
            <TouchableOpacity style={styles.closeButton}>
                <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Journaling Techniques for Gratitude</Text>
                <Text style={styles.subtitle}>
                    A gratitude journal offers a simple yet effective way to cultivate positivity and improve your overall well-being.
                    By regularly reflecting on what you are grateful for, you can shift your perspective to focus on all the good things
                    in your life.
                </Text>
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="Write your thoughts here..."
                />
            </View>
            <View style={styles.footer}>
                <Icon name="emoticon-outline" size={24} color="#000" />
                <Icon name="image-outline" size={24} color="#000" />
                <Icon name="microphone-outline" size={24} color="#000" />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="dots-horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                            <Text style={styles.modalButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                            <Text style={styles.modalButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#CCC' }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F5DC',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    saveButton: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 230,
        right: 20,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 5,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default DiaryEntry;
