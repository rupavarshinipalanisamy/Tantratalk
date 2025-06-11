import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';

const AddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { existingAddress } = route.params || {};
  const [address, setAddress] = useState(existingAddress || '');

  const handleSave = () => {
    if (address.trim() === '') {
      Alert.alert('Error', 'Address cannot be empty');
      return;
    }

    // Optionally save to AsyncStorage or API
    navigation.navigate('CartScreen', { address }); // send back the address
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Delivery Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: colors.red,
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
