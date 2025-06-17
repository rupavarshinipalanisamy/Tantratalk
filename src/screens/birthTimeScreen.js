import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { commonstyles } from '../commonComponents/commonStyles';
import { Images } from '../utils/images';
import { Button } from '../commonComponents/Button';
import AnimatedImage from '../commonComponents/AnimatedImage';
import { ScreenName } from '../utils/screenName';
import { useFormik } from 'formik';
import CommonTimePicker from '../commonComponents/TimePicker';

const BirthTimeScreen = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(true);
    const { name, gender,phonenum ,birthdate } = route.params || {};

    const toggleModal = () => setModalVisible(!isModalVisible);

    const formik = useFormik({
        initialValues: {
            birthtime: "",
        },
        onSubmit: (values) => handleNavigation(values),
    });

    const handleNavigation = (values) => {
        console.log("Selected Birth Time:", values.birthtime);  // Log birthtime when submitting the form
        navigation.navigate(ScreenName.birthPlace, { 
            name, 
            gender, 
            birthdate, 
            phonenum,
            birthtime: values.birthtime 
        });
    };

    return (
        <View style={commonstyles.container}>
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Register</Text>

                    {/* Birth Time Picker */}
                    <CommonTimePicker 
                        onTimeChange={(time) => {
                            const formattedTime = `${time.hour}:${time.minute} ${time.meridian}`;
                            console.log("Updated Birth Time:", formattedTime);  // Log formatted time
                            formik.setFieldValue("birthtime", formattedTime);   // Update the form state with formatted time
                        }} 
                    />

                    {/* Next Button */}
                    <Button title="NEXT" onPress={formik.handleSubmit} fullWidth={true} style={{ marginTop: 50 }} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    selectedDate: {
        fontSize: 16,
        marginTop: 10,
        color: "#333",
    },
});

export default BirthTimeScreen;
