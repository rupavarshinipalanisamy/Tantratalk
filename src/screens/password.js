import { View, Text, ImageBackground, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { commonstyles } from '../commonComponents/commonStyles';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import { Button } from '../commonComponents/Button';
import AnimatedImage from '../commonComponents/AnimatedImage';
import { ScreenName } from '../utils/screenName';
import { useFormik } from 'formik';
import { FullNameSchema, password } from '../utils/validationSchema';
import { useLoginMutation, useRegisterMutation } from '../redux/services/auth/authSlice';


const Password = ({ navigation }) => {
    const [register, { isLoading }] = useRegisterMutation();

    const formik = useFormik({
        initialValues: { password: '' },
        validationSchema: password,
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        console.log("fghjjk")
        const payload = {
            password:values.password
        }
        try {
            const response = await register(JSON.stringify(payload)).unwrap();
            console.log('Login Success:', response);
            navigation.navigate(ScreenName.homeScreen);
        } catch (error) {
            console.error('Login Failed:', error);
        }
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
                                label="Password"
                                fullWidth={true}
                                borderColor="#00b1f3"
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                                onChange={(value) => formik.setFieldValue('password', value)}
                                secureTextEntry={true}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <Text style={commonstyles.errortxt}>{formik.errors.password}</Text>
                            )}
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <Button
                                title={isLoading ? 'LOADING...' : 'SUBMIT'}
                                onPress={() => formik.handleSubmit()}
                                fullWidth={true}
                                disabled={isLoading}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Password;
