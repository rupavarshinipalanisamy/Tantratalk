import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker from '../commonComponents/commonDatePicker';
import { ScreenName } from '../utils/screenName';

const MatchingKundliForm = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleSubmit = () => {
        navigation.navigate(ScreenName.matchingKundliForm2)
    };
    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Free Kundli" />
            <ImageBackground source={Images.loginbg} style={styles.backgroundContainer}>
                <View style={styles.headertxtContainer}>
                    <Text style={styles.headertxt}>Enter your Boy & girl to get your</Text>
                    <Text style={styles.headertxt}>Matching details</Text>
                </View>
                <View style={styles.centeredContent}>
                    <View style={styles.card}>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: colors.red, fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Enter Boy's Birth details</Text>
                            <InputField isLabel={true} label="Name" borderColor="#00b1f3" />
                            <InputField isLabel={true} label="Gender" borderColor="#00b1f3" />

                            <View style={{ marginTop: 10 }}>
                                <CustomDatePicker
                                    onSelectDate={(date) => setSelectedDate(date)}
                                    isLabel={true}
                                    label="Date of Birth"
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CustomDatePicker
                                    onSelectDate={(date) => setSelectedDate(date)}
                                    isLabel={true}
                                    label="Time of Birth"
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <InputField isLabel={true} label="Birth place" borderColor="#00b1f3" />
                            </View>
                            <View style={{ width: "100%", alignItems: "center", marginTop: 20}}>

                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default MatchingKundliForm;

const styles = StyleSheet.create({
    backgroundContainer: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingBottom: 20, // Ensures spacing at bottom
    },
    headertxtContainer: {
        position: "absolute",
        top: "5%", // Adjust to move higher or lower
        alignSelf: "center",
        alignItems: "center",
    },

    headertxt: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500"
    },
    inputlabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: colors.black1,
    },
    centeredContent: {
        marginTop: 120,
        alignItems: "center",
    },
    card: {
        width: "95%",
        backgroundColor: colors.white,
        elevation: 4,
        padding: 20,
        borderRadius: 8,
        alignSelf: "center",
        // alignItems: "center",
    },
    
    submitButton: {
        backgroundColor: colors.red,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        width: "45%", // Adjust width as needed
        alignSelf: "center", // Centers button
    },


    resetBtn: {
        borderWidth: 1,
        borderColor: colors.red,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        width: "40%",
        marginTop: 15,
        marginLeft: 10

    },
    submitButtonText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 16,
    },
    resetButtonText: {
        color: colors.red,
        fontWeight: "600",
        fontSize: 16,
    },
});

