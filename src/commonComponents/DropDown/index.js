import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { styles } from '../inputField/styles'; 

export const DropdownField = ({
  label = '',
  value = '',
  options = [],
  onChange = () => {},
  borderColor = '#ccc',
  isLabel = false,
  fullWidth = false,
  disabled = false,
  placeholder = 'Select an option',
  isError = false,
  style = {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    onChange(item);
    setModalVisible(false);
  };

  return (
    <View style={{ width: '100%' }}>
      {isLabel && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={{
          ...styles.textBox,
          ...(isError ? styles.error : null),
          ...(fullWidth ? styles.fullWidth : null),
          borderColor: disabled ? '#ccc' : borderColor,
          ...style,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => !disabled && setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? 'black' : '#afafaf' }}>
          {value || placeholder}
        </Text>
        {/* <Ionicons name="chevron-down" size={20} color="#555" /> */}
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={dropdownStyles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={dropdownStyles.dropdownContainer}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={dropdownStyles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const dropdownStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: 300,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
});
