import React from 'react';
import { View, Button, StyleSheet, Modal, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const GoogleMeetWebView = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Schedule Google Meet</Text>
          <WebView
            source={{ uri: 'https://meet.google.com/landing?pli=1' }}
            style={{ flex: 1 }}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    margin: 10,
  },
});

export default GoogleMeetWebView;
