import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import AppIcon from "../commonComponents/Icons/Icons";
import { colors } from "../utils/colors";
import { commonstyles } from "../commonComponents/commonStyles";
import { Images } from "../utils/images";
import { Button } from "../commonComponents/Button";
import AnimatedImage from "../commonComponents/AnimatedImage";
import { ScreenName } from "../utils/screenName";

const Gender = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState(null);

    return (
        <View style={commonstyles.container}>
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Register</Text>
                    <View style={{ alignSelf: "flex-start",marginLeft:10,top:20}}>
                        <Text style={commonstyles.inputlabel}>Please Select your Gender</Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "120%",
                        alignItems: "center",
                    }}>
                        <TouchableOpacity
                            style={[styles.genderBox, selectedGender === "male" && styles.selected]}
                            onPress={() => setSelectedGender("male")}
                        >
                            <AppIcon
                                name="male"
                                size={30}
                                color={colors.black}
                                library="Fontisto"

                            />
                            <Text style={[styles.genderText, selectedGender === "male" && styles.selectedText]}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderBox, selectedGender === "female" && styles.selected]}
                            onPress={() => setSelectedGender("female")}
                        >
                            <AppIcon
                                name="female"
                                size={30}
                                color={colors.black}
                                library="Fontisto"

                            />
                            <Text style={[styles.genderText, selectedGender === "female" && styles.selectedText]}>Female</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", marginTop: 50 }}>
                        <Button title="NEXT" onPress={() => navigation.navigate(ScreenName.birthScreen)} fullWidth={true} />

                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({

    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
    },
    genderBox: {
        width: "35%",
        height: "65%",
        borderRadius:10,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#ddd",
        elevation: 5, // Shadow effect
    },
    selected: {
        // backgroundColor:null,
        borderColor: colors.red,
        borderWidth: 1.5,
    },
    genderText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    selectedText: {
        color: colors.red,
    },
});

export default Gender
