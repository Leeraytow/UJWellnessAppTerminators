import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Footer from '../Menu/Footer'; 

export default function SessionInfo() {
  const [activeTab, setActiveTab] = useState('Information');
  
  const [medications, setMedications] = useState({
    med1: '',
    med2: '',
  });
  
  const [diagnoses, setDiagnoses] = useState({
    diag1: '',
    diag2: '',
  });
  
  const [additionalNotes, setAdditionalNotes] = useState(
    ""
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Medicine':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.subSectionTitle}>Medicine</Text>
            <TextInput
              style={styles.input}
              value={medications.med1}
              onChangeText={(text) => setMedications({ ...medications, med1: text })}
              placeholder="Medication 1"
            />
            <TextInput
              style={styles.input}
              value={medications.med2}
              onChangeText={(text) => setMedications({ ...medications, med2: text })}
              placeholder="Medication 2"
            />
          </View>
        );
      case 'Diagnose':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.subSectionTitle}>Diagnose</Text>
            <TextInput
              style={styles.input}
              value={diagnoses.diag1}
              onChangeText={(text) => setDiagnoses({ ...diagnoses, diag1: text })}
              placeholder="Diagnosis 1"
            />
            <TextInput
              style={styles.input}
              value={diagnoses.diag2}
              onChangeText={(text) => setDiagnoses({ ...diagnoses, diag2: text })}
              placeholder="Diagnosis 2"
            />
          </View>
        );
      default:
        return (
          <View style={styles.generalInfoContainer}>
            <Text style={styles.subSectionTitle}>General</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>First name</Text>
              <Text style={styles.infoText}>Edward</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Surname</Text>
              <Text style={styles.infoText}>Molefi</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoText}>04/07/2003</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoText}>Male</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Session Info</Text>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Edward Molefi</Text>
            <Text style={styles.details}>20yrs · Depression · Takes meds</Text>
            <Text style={styles.date}>23 Sep 2024 11:30-12:00</Text>
          </View>
        </View>

        <View style={styles.complaintsContainer}>
          <Text style={styles.sectionTitle}>Complaints</Text>
          <View style={styles.tagsContainer}>
            {['Bad mood', 'Insomnia', 'Anger', 'Anxiety'].map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tabsContainer}>
          {['Information', 'Medicine', 'Diagnose'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === tab ? styles.activeTab : null]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab ? styles.activeTabText : null]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderContent()}

        <View style={styles.additionalInfoContainer}>
          <Text style={styles.subSectionTitle}>Additional</Text>
          <TextInput
            style={styles.additionalInput}
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            placeholder="Therapist Notes"
            multiline
          />
        </View>
      </ScrollView>

      <Footer /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 14,
    color: '#f57c00',
    marginTop: 4,
  },
  complaintsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#ffcc80',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#f57c00',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffcc80',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#f57c00',
  },
  generalInfoContainer: {
    borderWidth: 1,
    borderColor: '#ffcc80',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 4,
    marginBottom: 8,
  },
  additionalInfoContainer: {
    borderWidth: 1,
    borderColor: '#ffcc80',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  additionalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
