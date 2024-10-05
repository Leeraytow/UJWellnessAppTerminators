import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsScreen = () => {
  const navigation = useNavigation();

  const handleAgree = () => {
    navigation.navigate('StudentLogin');  // Replace 'Home' with the actual screen you want to navigate to after agreement
  };

  const handleDisagree = () => {
    Alert.alert(
      "Terms Not Accepted",
      "You must accept the terms and conditions to proceed.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.termsContainer}>
        <Text style={styles.title}>Terms and Conditions</Text>
        
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          These terms and conditions ("Terms") govern your use of the UJ Wellness mobile application ("App"). By using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the App.
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.text}>
          The App is intended for use by current students of the University of Johannesburg ("UJ"). You confirm that you are a registered student at UJ and that your use of the App is for personal wellness purposes only.
        </Text>

        <Text style={styles.sectionTitle}>3. User Account</Text>
        <Text style={styles.text}>
          You may be required to create an account to use certain features of the App. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Privacy</Text>
        <Text style={styles.text}>
          We respect your privacy and are committed to protecting your personal information. The App may collect personal information such as your name, student number, and usage data. This information will be used in accordance with UJ's privacy policy and applicable data protection laws.
        </Text>

        <Text style={styles.sectionTitle}>5. Usage of the App</Text>
        <Text style={styles.text}>
          You agree to use the App in a lawful and responsible manner. You must not use the App to engage in any unlawful, harmful, or fraudulent activities. UJ reserves the right to suspend or terminate your access to the App if you violate these Terms.
        </Text>

        <Text style={styles.sectionTitle}>6. Health and Wellness Resources</Text>
        <Text style={styles.text}>
          The App provides wellness resources such as podcasts, videos, therapy services, and community support options. These resources are for informational purposes only and do not constitute professional medical advice. Always seek the advice of a qualified healthcare provider for any medical conditions.
        </Text>

        <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
        <Text style={styles.text}>
          UJ is not responsible for any harm or damage arising from your use of the App. The App is provided "as is" without any warranties, express or implied. UJ does not guarantee that the App will be free from errors or interruptions.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to the App</Text>
        <Text style={styles.text}>
          UJ reserves the right to modify, update, or discontinue the App at any time without notice. UJ may also update these Terms from time to time. Your continued use of the App after such changes will constitute your acceptance of the updated Terms.
        </Text>

        <Text style={styles.sectionTitle}>9. Intellectual Property</Text>
        <Text style={styles.text}>
          All content on the App, including text, graphics, logos, and software, is the property of UJ or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or modify any content from the App without UJ's prior written consent.
        </Text>

        <Text style={styles.sectionTitle}>10. Governing Law</Text>
        <Text style={styles.text}>
          These Terms are governed by and construed in accordance with the laws of South Africa. Any disputes arising out of or in connection with these Terms will be subject to the exclusive jurisdiction of the South African courts.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact Information</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about these Terms or the App, please contact UJ Wellness Support via email at wellness@uj.ac.za or visit the UJ Wellness website.
        </Text>
        
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
          <Text style={styles.buttonText}>I Agree</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.disagreeButton} onPress={handleDisagree}>
          <Text style={styles.buttonText}>I Disagree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,  // Add padding to lower the content
    backgroundColor: '#F5F5F5',
  },
  termsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  agreeButton: {
    backgroundColor: '#FFA726',  // Light orange shade
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  disagreeButton: {
    backgroundColor: '#FF7043',  // Darker orange shade
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TermsScreen;
