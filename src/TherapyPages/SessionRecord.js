import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function SessionInfo() {
  const [activeTab, setActiveTab] = useState('Information');
  
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSession}>
          <Text style={styles.saveButtonText}>Save Student Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4ff',
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
    color: '#4a148c',
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
    color: '#4a148c',
  },
  details: {
    fontSize: 14,
    color: '#7c4dff',
  },
  date: {
    fontSize: 14,
    color: '#6a1b9a',
    marginTop: 4,
  },
  complaintsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4a148c',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e1bee7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#6a1b9a',
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
    backgroundColor: '#d1c4e9',
  },
  tabText: {
    fontSize: 16,
    color: '#7c4dff',
  },
  activeTabText: {
    color: '#4a148c',
  },
  generalInfoContainer: {
    borderWidth: 1,
    borderColor: '#9575cd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ede7f6',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4a148c',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7c4dff',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#9575cd',
    paddingVertical: 4,
    marginBottom: 8,
    color: '#4a148c',
  },
  additionalInfoContainer: {
    borderWidth: 1,
    borderColor: '#9575cd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ede7f6',
  },
  additionalInput: {
    borderWidth: 1,
    borderColor: '#9575cd',
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    textAlignVertical: 'top',
    color: '#4a148c',
  },
  saveButton: {
    backgroundColor: '#4a148c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  referralSection: {
    marginTop: 16,
  },
  checkboxGroup: {
    marginVertical: 8,
  },
  referralRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationTable: {
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  labelColumn: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
  checkboxColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
