import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Animated, TouchableOpacity } from 'react-native';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import { Button } from '../commonComponents/Button';
import { colors } from '../utils/colors';
import { commonstyles } from '../commonComponents/commonStyles';
import { ScreenName } from '../utils/screenName';
import AnimatedImage from '../commonComponents/AnimatedImage';
import { useFormik } from 'formik';
import { useLoginMutation } from '../redux/services/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../commonComponents/loader';
import { login } from "../redux/slices/authStateSice/index";
import { getUserId } from "../utils/helper";


const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            contact: '',
            password: ''
        },
        // validationSchema: password,
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    const [loginApi] = useLoginMutation();
    const { isLoggedIn } = useSelector((state) => state.auth);


    useEffect(() => {
        console.log(isLoggedIn, "useEffectstate");

    }, [isLoggedIn]);

    const handleLogin = async () => {
        const payload = {
            contact: formik.values.contact,
            password: formik.values.password,
        }
        console.log(payload, "payloadss");
        setLoading(true)
        try {
            const response = await loginApi(JSON.stringify(payload)).unwrap();
            console.log('Login Success:', response);
            const userToken = response.token;
            const userId = response.user._id;
            console.log(userToken, response, "responsess");
            await AsyncStorage.setItem('userToken', userToken);
            await AsyncStorage.setItem('userId', userId);
            dispatch(login({ token: userToken }));
            navigation.navigate(ScreenName.homeScreen);
        } catch (error) {
            setLoading(false)

            console.error('Login Failed:', error);
        } finally {
            setLoading(false)

        }
    };
    return (
        <View style={commonstyles.container}>
            {loading && <Loader />}
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Log In</Text>
                    <View style={commonstyles.inputContainer}>
                        {/* <InputField isLabel={true} label="Phone No." borderColor="#00b1f3" /> */}
                        <View>
                            <InputField
                                isLabel={true}
                                label="Phone No."
                                fullWidth={true}
                                borderColor="#00b1f3"
                                onBlur={formik.handleBlur('contact')}
                                value={formik.values.contact}
                                onChange={(value) => formik.setFieldValue('contact', value)}
                            />
                            {formik.touched.contact && formik.errors.contact && (
                                <Text style={commonstyles.errortxt}>{formik.errors.contact}</Text>
                            )}
                        </View>
                        <View style={{ marginTop: 15 }}>
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
                        <TouchableOpacity style={{ alignItems: "flex-end", marginTop: 10 }}>
                            <Text style={styles.forgotpasstxt}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }}>
                            <Button title="LOG IN" onPress={() => handleLogin()} fullWidth={true} />
                        </View>
                        <TouchableOpacity style={{ alignItems: "center", marginTop: 20 }} onPress={() => navigation.navigate(ScreenName.UserName)}>
                            <Text style={styles.registertxt}>
                                Don't have an account? <Text style={{ color: colors.red }}>Register</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    animatedImage: {
        position: "absolute",
        width: "35%",
        height: "40%",
        top: "10%", // Adjust position
    },


    forgotpasstxt: {
        color: colors.red,
        fontSize: 12,
        fontWeight: "400",
    },
    registertxt: {
        color: colors.black1,
        fontSize: 14,
        fontWeight: "400",
    },
});

export default LoginScreen;