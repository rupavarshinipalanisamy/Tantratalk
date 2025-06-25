import { View, Text, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { commonstyles } from '../../commonComponents/commonStyles'
import { Images } from '../../utils/images'
import { InputField } from '../../commonComponents/inputField'
import { Button } from '../../commonComponents/Button'
import AnimatedImage from '../../commonComponents/AnimatedImage'
import Navigation from '../../navigation/navigation'
import { ScreenName } from '../../utils/screenName'
import { useFormik } from 'formik';
import { birthplace } from '../../utils/validationSchema'


const BirthPlaceScreen = ({ navigation, route }) => {
    const { name, gender,phonenum, birthdate, birthtime } = route.params || {};

    const formik = useFormik({
        initialValues: {
            birthplace: '',
        },
        onSubmit: (values) => handleNavigation(values),
        validationSchema: birthplace
    });
    const handleNavigation = (values) => {
        console.log('====================================');
        console.log(values.birthplace);
        console.log('====================================');
        navigation.navigate(ScreenName.profileupload, { name, phonenum,gender, birthdate, birthtime, birthplace: formik.values.birthplace });
    };
    useEffect(() => {
        console.log(name, gender, birthdate, birthtime,"detailsss");

    }, []);
    return (
        <View style={commonstyles.container}>
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Register</Text>
                    <View style={commonstyles.inputContainer}>
                        <View>
                            <InputField
                                isLabel={true}
                                label="City"
                                fullWidth={true}
                                borderColor="#00b1f3"
                                onBlur={formik.handleBlur('birthplace')}
                                value={formik.values.birthplace}
                                onChange={(value) => formik.setFieldValue('birthplace', value)}
                            />
                            {formik.touched.birthplace &&
                                formik.errors.birthplace && (
                                    <Text style={commonstyles.errortxt}>
                                        {formik.errors.birthplace}
                                    </Text>
                                )}
                        </View>
                        {/* <InputField isLabel={true} label="City" borderColor="#00b1f3" /> */}
                        <View style={{ marginTop: 50 }}>
                            <Button title="NEXT" onPress={formik.handleSubmit} fullWidth={true} />
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default BirthPlaceScreen