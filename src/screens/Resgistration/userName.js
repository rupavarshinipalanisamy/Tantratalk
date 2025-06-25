import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { commonstyles } from '../../commonComponents/commonStyles'
import { Images } from '../../utils/images'
import { InputField } from '../../commonComponents/inputField'
import { Button } from '../../commonComponents/Button'
import AnimatedImage from '../../commonComponents/AnimatedImage'
import Navigation from '../../navigation/navigation'
import { ScreenName } from '../../utils/screenName'
import { useFormik } from 'formik';
import {  FullNameSchema } from '../../utils/validationSchema'

const UserName = ({ navigation }) => {
    const formik = useFormik({
        initialValues: {
            fullname: '',
        },
        onSubmit: (values) => handleNavigation(values),
        validationSchema: FullNameSchema
    });

    const handleNavigation = (values) => {
        navigation.navigate(ScreenName.phonenum, { name:formik.values.fullname});
    };
    const handleNext = () => {
        formik.handleSubmit(); // Ensures validation happens first
    };
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
                                label="Full Name"
                                fullWidth={true}
                                borderColor="#00b1f3"
                                onBlur={formik.handleBlur('fullname')}
                                value={formik.values.fullname}
                                onChange={(value) => formik.setFieldValue('fullname', value)}
                            />
                            {formik.touched.fullname &&
                                formik.errors.fullname && (
                                    <Text style={commonstyles.errortxt}>
                                        {formik.errors.fullname}
                                    </Text>
                                )}
                        </View>

                        <View style={{ marginTop: 50 }}>
                            <Button
                                title="NEXT"
                                onPress={handleNext}
                                fullWidth={true}
                            />

                        </View>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default UserName