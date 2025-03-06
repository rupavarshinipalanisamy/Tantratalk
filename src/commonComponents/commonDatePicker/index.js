import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CustomDatePicker = ({ visible, onClose, onSelectDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Select date</Text>

                    <Calendar
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: "#8B5E3C" },
                        }}
                        theme={{
                            backgroundColor: "#F6E5DA",
                            calendarBackground: "#F6E5DA",
                            selectedDayBackgroundColor: "#8B5E3C",
                            selectedDayTextColor: "#FFFFFF",
                            todayTextColor: "#8B5E3C",
                            arrowColor: "#8B5E3C",
                            monthTextColor: "#8B5E3C",
                            textMonthFontSize: 18,
                            textMonthFontWeight: "bold",
                        }}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedDate) {
                                    onSelectDate(selectedDate);
                                    onClose();
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
        width: "90%",
        backgroundColor: "#F6E5DA",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#8B5E3C",
        marginBottom: 10,
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
        color: "#8B5E3C",
    },
    okButton: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#8B5E3C",
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
