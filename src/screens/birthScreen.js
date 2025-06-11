import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { commonstyles } from '../commonComponents/commonStyles'
import { Images } from '../utils/images'
import { InputField } from '../commonComponents/inputField'
import { Button } from '../commonComponents/Button'
import AnimatedImage from '../commonComponents/AnimatedImage'
import Navigation from '../navigation/navigation'
import { ScreenName } from '../utils/screenName'
import { useFormik } from 'formik'
import CommonDatePicker from '../commonComponents/DatePicker'

const BirthDate = ({ navigation,route }) => {
    const { name,phonenum, gender} = route.params || {};
    const [isModalVisible, setModalVisible] = useState(true);
    const [selectedDate, setSelectedDate] = useState("1 Jan 2000");

    const toggleModal = () => setModalVisible(!isModalVisible);
    const formik = useFormik({
        initialValues: {
            birthDate: ""
        },
        onSubmit: (values) => handleNavigation(values),
    });

    const handleNavigation = (values) => {
        console.log(values.birthDate,"navigate");
       navigation.navigate(ScreenName.birthtime, {name, phonenum,gender, birthdate: values.birthDate });
    };
    return (
        <View style={commonstyles.container}>
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Register</Text>
                    <CommonDatePicker
                        onDateChange={(date) => {
                            console.log("Selected Date:", `${date.day} ${date.month} ${date.year}`);
                            formik.setFieldValue("birthDate", `${date.day} ${date.month} ${date.year}`);
                        }}
                    />

                    <Button title="NEXT" onPress={formik.handleSubmit} fullWidth={true} style={{ marginTop: 50 }} />
                </View>
            </ImageBackground>
        </View>
    )
}
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
export default BirthDate