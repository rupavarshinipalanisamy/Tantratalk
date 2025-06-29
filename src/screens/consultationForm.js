import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker from '../commonComponents/commonDatePicker';
import { ScreenName } from '../utils/screenName';

const ConsultationForm = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleSubmit = () => {
       navigation.navigate(ScreenName.Astrologers)
    };
    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Consultation" />
            <ImageBackground source={Images.loginbg} style={styles.backgroundContainer}>
                <View style={styles.centeredContent}>
                    <View style={styles.card}>
                    <Text style={commonstyles.inputlabel}>Personal Details</Text>
                        <View style={{marginTop:30}}>
                            <InputField isLabel={true} label="Full Name" borderColor="#00b1f3" />
                            <View style={{ marginTop: 10 }}>
                                <InputField isLabel={true} label="Phone number" borderColor="#00b1f3" />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CustomDatePicker
                                    onSelectDate={(date) => setSelectedDate(date)}
                                    isLabel={true}
                                    label="Date of Birth"
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <InputField isLabel={true} label="Email" borderColor="#00b1f3" />
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Book Appointment</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default ConsultationForm;

const styles = StyleSheet.create({
    backgroundContainer: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingBottom: 20, // Ensures spacing at bottom
    },
    inputlabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color:colors.black1,
    },
    centeredContent: {
        marginTop: 120,
        alignItems: "center",
    },
    card: {
        width: "95%",
        backgroundColor: colors.white,
        padding:20,
        elevation: 4,
        paddingVertical:30,
        // borderTopRightRadius: 40,
        // borderTopLeftRadius: 40,
        borderRadius:8,
        alignSelf: "center",
    },
    submitButton: {
        backgroundColor: colors.red,
        paddingVertical: 15,
        borderRadius: 6,
        alignItems: "center",
        alignSelf: "center",
        width: "95%", // Makes it wider but not full screen
        marginBottom:"20%"
    },
    submitButtonText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 16,
    },
});
