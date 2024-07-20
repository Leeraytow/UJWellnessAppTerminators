import React, { useState, useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { TextSizeContext } from './TextSizeContext';

const CustomizableSettings = () => {
  const { textSize } = useContext(TextSizeContext);
  const [sessionReminders, setSessionReminders] = useState(false);
  const [wellnessTips, setWellnessTips] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [anonymity, setAnonymity] = useState(false);

  return (
    <View style={styles.container}>
    
      <View style={styles.setting}>
        <Text style={[styles.label, { fontSize: textSize }]}>Notification Preferences</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { fontSize: textSize }]}>Session Reminders</Text>
          <Switch
            value={sessionReminders}
            onValueChange={setSessionReminders}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { fontSize: textSize }]}>Wellness Tips</Text>
          <Switch
            value={wellnessTips}
            onValueChange={setWellnessTips}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, { fontSize: textSize }]}>Privacy Settings</Text>
       
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { fontSize: textSize }]}>Anonymity Options</Text>
          <Switch
            value={anonymity}
            onValueChange={setAnonymity}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
 
setting: {
marginVertical: 16,
},
label: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 8,
},
switchContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 8,
},
switchLabel: {
fontSize: 16,
},
});

export default CustomizableSettings;