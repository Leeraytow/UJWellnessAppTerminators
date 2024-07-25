import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const hospitals = [
  {
    name: 'Helen Joseph Hospital - Psychiatry Clinic',
    address: 'Helen Joseph Hospital, Perth Road, Auckland Park, Johannesburg, 2092',
    phone: '011 489 0619',
  },
  {
    name: 'Charlotte Maxeke Johannesburg Academic Hospital - Dept of Psychiatry',
    address: 'Area 459 Charlotte Maxeke Jhb Academic Hosp, Jubilee Road, Parktown, Johannesburg, 2193',
    phone: '011 717 2026',
  },
  {
    name: 'Witwatersrand Mental Health Society',
    address: '85 Tudhope Ave, Berea, Johannesburg, 2198',
    phone: '011 484 1503',
  },
  {
    name: 'Empire Mental Health Care Centre',
    address: '701, North City Building, 28 Melle St, Braamfontein, Johannesburg, 2017',
    phone: '011 339 1210',
  },
  {
    name: 'Akeso Crescent Clinic Randburg',
    address: 'Cnr Hawken &, President Fouche Dr, Boskruin, Randburg, 2188',
    hours: 'Open 24 hours',
    phone: '087 098 0457',
  },
  {
    name: 'Soweto Life Path Health Hospital',
    address: 'Ext 3, 35 Britlewood Street Soweto Healthcare Hub Building 2nd Floor, Dlamini, Soweto, 1818',
    areasServed: 'Johannesburg',
    hours: 'Open 24 hours',
    phone: '010 534 5660',
  },
  {
    name: 'Chris Hani Baragwanath Hospital - Dept of Psychiatry',
    address: 'Ward 55 Chris Hani Baragwanath Hosp, Kimberley Road, Diepmeadow, 1862',
    phone: '011 933 9239',
  },
  {
    name: 'Dr. Motalazae',
    website: 'https://www.drmotalazae.co.za/',
    address: '6 Junction Ave, Parktown, Johannesburg, 2193, South Africa',
  },
  {
    name: 'Psych Central',
    website: 'https://www.psychcentral.co.za/',
    address: 'Block F, 37 Homestead Rd, Rivonia, Sandton, 2128, South Africa',
    operatingHours: 'Monday – Friday 8:00 AM – 8:00 PM, Saturday 8:00 AM – 4:00 PM',
  },
  {
    name: 'The Day Clinic',
    website: 'https://www.thedayclinic.co.za/',
    address: 'Oxford Healthcare Centre, 75 Oxford Rd, Johannesburg, 2196, South Africa',
    operatingHours: 'Monday – Friday 8:00 AM – 5:00 PM',
  },
  {
    name: 'Akeso Clinic',
    website: 'https://www.netcare.co.za/netcare-akeso',
    address: '3rd St, Gauteng, Johannesburg, 2193, South Africa',
    operatingHours: 'Monday – Friday 8:00 AM – 5:00 PM',
  },
  {
    name: 'Meaningful Minds Psychologists',
    website: 'https://www.meaningfulminds.co.za/',
    address: '3 Bradford Rd, Germiston, Johannesburg, 2008, South Africa',
    operatingHours: 'Monday – Friday 8:00 AM – 7:00 PM, Saturday 8:00 AM – 2:00 PM',
  },
];

const openMap = (address) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  Linking.openURL(url);
};

const callNumber = (phone) => {
  let phoneNumber = `tel:${phone}`;
  Linking.openURL(phoneNumber);
};

const HospitalCard = ({ hospital }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{hospital.name}</Text>
    <TouchableOpacity onPress={() => openMap(hospital.address)}>
      <Text style={styles.address}>{hospital.address}</Text>
    </TouchableOpacity>
    {hospital.phone && (
      <TouchableOpacity onPress={() => callNumber(hospital.phone)}>
        <Text style={styles.phone}>Phone: {hospital.phone}</Text>
      </TouchableOpacity>
    )}
    {hospital.hours && <Text style={styles.hours}>Hours: {hospital.hours}</Text>}
    {hospital.website && (
      <TouchableOpacity onPress={() => Linking.openURL(hospital.website)}>
        <Text style={styles.website}>Website: {hospital.website}</Text>
      </TouchableOpacity>
    )}
    {hospital.contactDetails && <Text style={styles.contactDetails}>Contact: {hospital.contactDetails}</Text>}
    {hospital.operatingHours && <Text style={styles.operatingHours}>Operating Hours: {hospital.operatingHours}</Text>}
  </View>
);

const  MedicalHelp = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hospitals Offering Mental Health Support</Text>
      {hospitals.map((hospital, index) => (
        <HospitalCard key={index} hospital={hospital} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 16,
    textAlign: 'center',
    color: '#FF5E0E',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FFA500',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#FF5E0E',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 4,
  },
  hours: {
    fontSize: 16,
    marginBottom: 4,
    color: '#FF5E0E',
  },
  website: {
    fontSize: 16,
    color: '#FF5E0E',
    marginBottom: 4,
    textDecorationLine: 'underline',
  },
  contactDetails: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  operatingHours: {
    fontSize: 16,
    marginBottom: 4,
    color: '#FF5E0E',
  },
});

export default MedicalHelp;