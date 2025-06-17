// import React, { useState,useEffect } from "react";
// import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { colors } from "../../utils/colors";
// import { formatDate } from "../../utils/helper";

// const CustomDatePicker = ({ onSelectDate, value = null, isLabel = false, label = '' }) => {
//     const [selectedDate, setSelectedDate] = useState(value);
//     const [datePickerVisible, setDatePickerVisible] = useState(false);
//     const [showYearPicker, setShowYearPicker] = useState(false);


//     useEffect(() => {
//         if (value) setSelectedDate(value);
//     }, [value]);
//     return (
//         <View>
//             {isLabel && <Text style={styles.label}>{label}</Text>}
//             <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.textBox}>
//                 <Text style={styles.dateText}>
//                     {selectedDate ? formatDate(selectedDate) : 'Select Date'}
//                 </Text>
//             </TouchableOpacity>
//             <Modal transparent visible={datePickerVisible} animationType="fade">
//                 <View style={styles.overlay}>
//                     <View style={styles.container}>
//                         <Calendar
//                             onDayPress={(day) => setSelectedDate(day.dateString)}
//                             markedDates={{
//                                 [selectedDate]: { selected: true, selectedColor: colors.red },
//                             }}
//                             theme={{
//                                 calendarBackground: colors.white,
//                                 selectedDayBackgroundColor: "rgba(189, 44, 60, 0.2)",
//                                 selectedDayTextColor: "#FFFFFF",
//                                 todayTextColor: colors.red,
//                                 arrowColor: colors.red,
//                                 monthTextColor: colors.red,
//                                 textMonthFontSize: 18,
//                                 textMonthFontWeight: "bold",
//                             }}
//                         />

//                         {/* Buttons */}
//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity onPress={() => setDatePickerVisible(false)} style={styles.cancelButton}>
//                                 <Text style={styles.cancelText}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     if (selectedDate) {
//                                         onSelectDate(selectedDate);
//                                         setDatePickerVisible(false);
//                                     }
//                                 }}
//                                 style={styles.okButton}
//                             >
//                                 <Text style={styles.okText}>OK</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//     container: {
//         width: "85%",
//         backgroundColor: colors.white,
//         borderRadius: 10,
//         padding: 15,
//         alignItems: "center",
//     },
//     inputField: {
//         padding: 10,
//         borderWidth: 1,
//         borderColor: colors.black1,
//         borderRadius: 5,
//     },
//     textBox: {
//         borderRadius: 5,
//         padding: 10,
//         fontSize: 16,
//         color: 'black',
//         width: '100%',
//         backgroundColor: colors.lightgrey
//         // marginBottom: 10,
//     },
//     dateText: {
//         fontSize: 16,
//         color: colors.black1,
//     },
//     label: {
//         fontSize: 14,
//         fontWeight: '500',
//         marginBottom: 5,
//         color: colors.black1,
//     },
//     buttonContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width: "100%",
//         marginTop: 15,
//     },
//     cancelButton: {
//         flex: 1,
//         alignItems: "center",
//         padding: 10,
//     },
//     cancelText: {
//         fontSize: 16,
//         color: colors.red,
//     },
//     okButton: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: colors.red,
//         padding: 10,
//         borderRadius: 5,
//     },
//     okText: {
//         fontSize: 16,
//         color: "#FFFFFF",
//         fontWeight: "bold",
//     },
// });

// export default CustomDatePicker;


import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors } from "../../utils/colors";
import { formatDate } from "../../utils/helper";
import moment from "moment";

const CustomDatePicker = ({ onSelectDate, value = null, isLabel = false, label = '' }) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [markedYearMonth, setMarkedYearMonth] = useState(moment().format("YYYY-MM"));

    useEffect(() => {
        if (value) {
            console.log(value, "valueeee");
            setSelectedDate(value);
            setMarkedYearMonth(moment(value).format("YYYY-MM"));
        }
    }, [value]);



    const handleYearSelect = (year) => {
        setShowYearPicker(false);
        const newMonth = moment(`${year}-01`).format("YYYY-MM");
        setMarkedYearMonth(newMonth);
    };

    return (
        <View>
            {isLabel && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.textBox}>
                <Text style={styles.dateText}>
                    {console.log(selectedDate,"selectedDate")}
                    {formatDate(selectedDate)}
                </Text>
            </TouchableOpacity>

            <Modal transparent visible={datePickerVisible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={{ position: 'absolute', top: 20, left: 0, right: 0, zIndex: 1 }} pointerEvents="box-none">
                            <TouchableOpacity
                                onPress={() => setShowYearPicker(true)}
                                style={{ height: 40 }}
                            />
                        </View>
                        {showYearPicker ? (
                            <ScrollView style={{ height: 250 }} contentContainerStyle={styles.yearGrid}>
                                {Array.from({ length: 100 }, (_, i) => 1950 + i).map((year) => (
                                    <TouchableOpacity
                                        key={year}
                                        onPress={() => handleYearSelect(year)}
                                        style={[
                                            styles.yearItem,
                                            year === parseInt(markedYearMonth.split("-")[0])
                                                ? { backgroundColor: colors.red }
                                                : {},
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    year === parseInt(markedYearMonth.split("-")[0])
                                                        ? 'white'
                                                        : 'black',
                                            }}
                                        >
                                            {year}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        ) : (
                            <Calendar
                                current={markedYearMonth}
                                onDayPress={(day) => setSelectedDate(day.dateString)}
                                markedDates={{
                                    [selectedDate]: { selected: true, selectedColor: colors.red },
                                }}
                                renderArrow={(direction) => {
                                    if (direction === "left") return null; // Hide left arrow
                                    if (direction === "right") return null;
                                    return null; // Customize right arrow
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
                        )}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {
                                setDatePickerVisible(false);
                                setShowYearPicker(false);
                            }} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (selectedDate) {
                                        onSelectDate(selectedDate);
                                        setDatePickerVisible(false);
                                        setShowYearPicker(false);
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
    textBox: {
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: 'black',
        width: '100%',
        backgroundColor: colors.lightgrey
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
    yearHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.red,
    },
    yearGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    yearItem: {
        width: 70,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: colors.lightgrey
    },
});

export default CustomDatePicker;

