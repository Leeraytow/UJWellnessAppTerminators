import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { TextSizeContext } from './TextSizeContext';

const AccessibilitySettings = () => {
  const { textSize, setTextSize, highContrast, setHighContrast } = useContext(TextSizeContext);
  const [isCompletelyBlind, setIsCompletelyBlind] = useState(false);
  const [isLowVision, setIsLowVision] = useState(false);
  const [useScreenReader, setUseScreenReader] = useState(false);
  const [useVoiceCommands, setUseVoiceCommands] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  return (
    <View style={styles.container}>
     

      <View style={styles.setting}>
        <Text style={styles.label}>Visual Impairment Details</Text>
        <View style={styles.switchContainer}>
          <Text>Completely Blind</Text>
          <Switch
            value={isCompletelyBlind}
            onValueChange={setIsCompletelyBlind}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Low Vision</Text>
          <Switch
            value={isLowVision}
            onValueChange={setIsLowVision}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Preferred Accessibility Tools</Text>
        <View style={styles.switchContainer}>
          <Text>Screen Reader</Text>
          <Switch
            value={useScreenReader}
            onValueChange={setUseScreenReader}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Voice Commands</Text>
          <Switch
            value={useVoiceCommands}
            onValueChange={setUseVoiceCommands}
          />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Text Size Adjustment</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={24}
          step={1}
          value={textSize}
          onValueChange={setTextSize}
        />
        <Text>Text Size: {textSize}</Text>
        <Text style={[styles.sampleText, { fontSize: textSize }]}>Sample Text</Text>
      </View>

      <View style={styles.setting}>
        <Text style={styles.label}>Color Contrast Adjustment</Text>
        <View style={styles.switchContainer}>
          <Text>High Contrast Mode</Text>
          <Switch
            value={highContrast}
            onValueChange={toggleHighContrast}
          />
        </View>
        {/* Add controls for high contrast here */}
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
  slider: {
    width: '100%',
    height: 40,
  },
  sampleText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default AccessibilitySettings;
