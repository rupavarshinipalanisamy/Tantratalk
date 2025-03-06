import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors } from "../../utils/colors";

const CustomDatePicker = ({ onSelectDate, isLabel = false, label = '' }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    return (
        <View>
            {isLabel && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity onPress={() => setDatePickerVisible(true)}  style={styles.textBox}>
                <Text style={styles.dateText}>{selectedDate}</Text>
            </TouchableOpacity>
            <Modal transparent visible={datePickerVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Calendar
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: colors.red },
                            }}
                            theme={{
                                calendarBackground: colors.white,
                                selectedDayBackgroundColor: "rgba(189, 44, 60, 0.2)",
                                selectedDayTextColor: "#FFFFFF",
                                todayTextColor: colors.red,
                                arrowColor: colors.red,
                                monthTextColor: colors.red,
                                textMonthFontSize: 18,
                                textMonthFontWeight: "bold",
                            }}
                        />

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => setDatePickerVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (selectedDate) {
                                        onSelectDate(selectedDate);
                                        setDatePickerVisible(false);
                                    }
                                }}
                                style={styles.okButton}
                            >
                                <Text style={styles.okText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        width: "85%",
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
    },
    inputField: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.black1,
        borderRadius: 5,
    },
    textBox: {
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: 'black',
        width: '100%',
        backgroundColor:colors.lightgrey
        // marginBottom: 10,
      },
    dateText: {
        fontSize: 16,
        color: colors.black1,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: colors.black1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 15,
    },
    cancelButton: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    cancelText: {
        fontSize: 16,
        color: colors.red,
    },
    okButton: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.red,
        padding: 10,
        borderRadius: 5,
    },
    okText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default CustomDatePicker;
