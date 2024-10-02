import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Menu/Header';

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

const HospitalCard = ({ hospital }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{hospital.name}</Text>
      <TouchableOpacity style={styles.row} onPress={() => openMap(hospital.address)}>
        <MaterialIcons name="location-pin" size={18} color="#F58220" />
        <Text style={styles.address}>{hospital.address}</Text>
      </TouchableOpacity>
      {hospital.phone && (
        <TouchableOpacity style={styles.row} onPress={() => callNumber(hospital.phone)}>
          <MaterialIcons name="phone" size={18} color="#F58220" />
          <Text style={styles.phone}>Phone: {hospital.phone}</Text>
        </TouchableOpacity>
      )}
      {hospital.website && (
        <TouchableOpacity onPress={() => Linking.openURL(hospital.website)}>
          <Text style={styles.website}>Website: {hospital.website}</Text>
        </TouchableOpacity>
      )}
      {hospital.operatingHours && (
        <Text style={styles.operatingHours}>Hours: {hospital.operatingHours}</Text>
      )}
    </View>
  );
};

const MedicalHelp = () => {
  return (
    <View style={styles.container}>
      <View >
        <Header/>
      </View>
      <Image source={require('../images/doctor.webp')} style={styles.image} />
      <Text style={styles.weCareText}>We Care!</Text>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.subHeader}>Hospitals Offering Mental Health Support</Text>
        <View style={styles.hospitalContainer}>
          {hospitals.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} />
          ))}
        </View>
        <TouchableOpacity style={styles.ctaButton} onPress={() => Linking.openURL('tel: 082 054 1137')}>
          <Text style={styles.ctaButtonText}>Need Help? Call Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    backgroundColor: '#F58220',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: 'cover',
  },
  weCareText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F58220',
    textAlign: 'center',
    marginTop: 10,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 20,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  hospitalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#F58220',
    width: '48%',
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    marginBottom: 4,
  },
  website: {
    fontSize: 16,
    color: '#F58220',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  operatingHours: {
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ctaButton: {
    backgroundColor: '#F58220',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 30,
  },
  ctaButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MedicalHelp;
