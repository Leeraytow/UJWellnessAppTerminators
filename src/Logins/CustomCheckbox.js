import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)}>
      <View style={styles.checkbox}>
        {value && <Icon name="check" size={14} color="#777" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    borderRadius: 3,
  },
});

export default CustomCheckbox;