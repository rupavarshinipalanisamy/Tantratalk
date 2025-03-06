import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Text, Animated, TouchableOpacity } from 'react-native';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import { Button } from '../commonComponents/Button';
import { colors } from '../utils/colors';
import { commonstyles } from '../commonComponents/commonStyles';
import { ScreenName } from '../utils/screenName';
import AnimatedImage from '../commonComponents/AnimatedImage';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={commonstyles.container}>
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Log In</Text>
                    <View style={commonstyles.inputContainer}>
                        <InputField isLabel={true} label="Email/Phone No." borderColor="#00b1f3" />
                        <View style={{ marginTop: 15 }}>
                            <InputField isLabel={true} label="Password" fullWidth={true} borderColor="#00b1f3" />
                        </View>
                        <TouchableOpacity style={{ alignItems: "flex-end", marginTop: 10 }}>
                            <Text style={styles.forgotpasstxt}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }}>
                            <Button title="LOG IN" onPress={() => navigation.navigate(ScreenName.homeScreen)} fullWidth={true} />
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
