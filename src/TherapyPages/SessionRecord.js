import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SessionInfo() {
  const [activeTab, setActiveTab] = useState('Information');
  const navigation = useNavigation();

  const [medications, setMedications] = useState({ med1: '', med2: '' });
  const [diagnoses, setDiagnoses] = useState({ diag1: '', diag2: '' });
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [selectedReferral, setSelectedReferral] = useState({});
  const [recommendations, setRecommendations] = useState(Array(19).fill(-1));

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
      case 'Information':
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
            {/* Referral and Outcome Section */}
            <View style={styles.referralSection}>
              <Text style={styles.header}>Psychologist to complete the following</Text>
              <Text style={styles.subHeader}>Referred by</Text>
              <View style={styles.checkboxGroup}>
                {referralOptions.map((option) => (
                  <View key={option.key} style={styles.referralRow}>
                    <CheckBox
                      checked={selectedReferral[option.key] || false}
                      onPress={() => handleReferralChange(option.key)}
                      containerStyle={{ padding: 0, margin: 0 }}
                    />
                    <Text>{option.label}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.subHeader}>Reason for client visit (Tick only the primary reason)</Text>
              <View style={styles.checkboxGroup}>
                {reasonForVisit.map((reason, index) => (
                  <View key={index} style={styles.reasonRow}>
                    <CheckBox
                      checked={selectedReferral[`reason${index}`] || false}
                      onPress={() => handleReferralChange(`reason${index}`)}
                      containerStyle={{ padding: 0, margin: 0 }}
                    />
                    <Text>{reason}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.subHeader}>Summary notes:</Text>
              <TextInput style={styles.input} multiline placeholder="Enter summary notes here" />
              <Text style={styles.header}>Please indicate the outcome (recommendation) of the session.</Text>
              <View style={styles.headerRow}>
                <View style={styles.labelColumn}></View>
                <Text style={styles.columnHeader}>1</Text>
                <Text style={styles.columnHeader}>2</Text>
                <Text style={styles.columnHeader}>3</Text>
                <Text style={styles.columnHeader}>4</Text>
              </View>
              <View style={styles.recommendationTable}>
                {recommendationLabels.map((label, rowIndex) => (
                  <View style={styles.row} key={rowIndex}>
                    <View style={styles.labelColumn}>
                      <Text style={styles.label}>{rowIndex + 1}. {label}</Text>
                    </View>
                    {[0, 1, 2, 3].map((colIndex) => (
                      <TouchableOpacity
                        key={colIndex}
                        style={styles.checkboxColumn}
                        onPress={() => handleCheckboxChange(rowIndex, colIndex)}
                      >
                        <CheckBox
                          checked={recommendations[rowIndex] === colIndex}
                          onPress={() => handleCheckboxChange(rowIndex, colIndex)}
                          containerStyle={{ padding: 0, margin: 0 }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
    }
  };

  const handleSaveSession = () => {
    Alert.alert("Session Saved", "Your session information has been saved successfully!");
  };

  const handleReferralChange = (key) => {
    setSelectedReferral((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const updatedRecommendations = [...recommendations];
    updatedRecommendations[rowIndex] = colIndex; // Only allow one checkbox to be checked
    setRecommendations(updatedRecommendations);
  };

  const referralOptions = [
    { label: 'Self', key: 'self' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'SRC', key: 'src' },
    { label: 'Campus Health', key: 'campusHealth' },
    { label: 'Other (please specify)', key: 'other' },
  ];

  const reasonForVisit = [
    'Improving academic performance',
    'Faculty referral (F5)',
    'Faculty referral (F7)',
    'Subject/Course advice',
    'Career advice',
    'CV Writing',
    'Interview Skills',
    'Career Planning',
    'Disability or special needs',
    'Financial concerns',
    'Personal/Emotional reasons',
    'SafeNet referral',
    'Other (please specify)',
  ];

  const recommendationLabels = [
    'Provided counselling and support',
    'Provided academic guidance / study skills / information',
    'Referred to available group interventions',
    'Provided career guidance or information',
    'Referred for Career Counselling',
    'Referred for Career Assessment',
    'Referred to Career Resource Centre',
    'Referred to Career Services Digital Platforms',
    'Referred to Academic Development Centre (ADC)',
    'Referred to Therapy',
    'Crisis intervention',
    'Referred to O: PWD',
    'Referred to Faculty',
    'Referred to Student Finance or NSFAS Office',
    'Referred to Campus Health',
    'Referred to Student Enrolment Centre',
    'Referred to SRC',
    'Referred Externally',
    'Other (please specify)',
  ];

  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerOn}>Register</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderContent()}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSession}>
          <Text style={styles.saveButtonText}>Save Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0', // Light background
    padding: 20,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 14,
  },
  headerOn: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    marginTop: 35,
    paddingHorizontal: 10,
    width: '140%',  // Stretch header to 140% of the screen width
    position: 'relative', // Optional
    left: '-3%',  // Move it left to center it
},
  details: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  complaintsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0a500', // Light orange
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#f0a500', // Light orange
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  contentContainer: {
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  generalInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoText: {
    color: '#555',
  },
  referralSection: {
    marginTop: 20,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  checkboxGroup: {
    marginVertical: 10,
  },
  referralRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  labelColumn: {
    flex: 2,
  },
  checkboxColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recommendationTable: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    flex: 2,
  },
  saveButton: {
    backgroundColor: '#f0a500', // Light orange
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

