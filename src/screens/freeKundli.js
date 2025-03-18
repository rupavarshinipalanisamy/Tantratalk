import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker from '../commonComponents/commonDatePicker';
import { ScreenName } from '../utils/screenName';

const FreeKundli = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleSubmit = () => {
        navigation.navigate(ScreenName.freeKudliDetails)
    };
    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Free Kundli" />
            <ImageBackground source={Images.loginbg} style={styles.backgroundContainer}>
                <View style={styles.headertxtContainer}>
                    <Text style={styles.headertxt}>Enter your Birth Details & get your</Text>
                    <Text style={styles.headertxt}>Kundli details</Text>
                </View>
                <View style={styles.centeredContent}>
                    <View style={styles.card}>
                        <View style={{ marginTop: 30 }}>
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
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.resetBtn} onPress={handleSubmit}>
                                    <Text style={styles.resetButtonText}>RESET</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default FreeKundli;

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
        padding: 20,
        elevation: 4,
        paddingVertical: 30,
        // borderTopRightRadius: 40,
        // borderTopLeftRadius: 40,
        borderRadius: 8,
        alignSelf: "center",
    },
    submitButton: {
        backgroundColor: colors.red,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        width: "40%",
        marginTop: 15

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
