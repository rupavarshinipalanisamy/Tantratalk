import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import CommonTimePicker from '../TimePicker';

const TimePickerModalField = ({ value, onTimeChange, label = 'Birth Time' }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View >
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.inputBox}
      >
        <Text style={styles.inputText}>
          {value || 'Select Time'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CommonTimePicker
              initialTime={{
                hour: value?.split(':')[0] || '12',
                minute: value?.split(':')[1]?.split(' ')[0] || '00',
                meridian: value?.split(' ')[1] || 'AM',
              }}
              onTimeChange={(time) => {
                const formatted = `${time.hour}:${time.minute} ${time.meridian}`;
                onTimeChange(formatted);
              }}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.doneButton}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimePickerModalField;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.black1,
  },
  inputBox: {
    backgroundColor: colors.lightgrey,
    padding: 12,
    borderRadius: 6,
  },
  inputText: {
    fontSize: 16,
    color: colors.black1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  doneText: {
    color: 'white',
    fontSize: 16,
  },
});
