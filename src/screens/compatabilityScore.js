import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Dimensions, Text, ScrollView, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../utils/colors";
import CircularProgressBar from "../commonComponents/circularProgressBar.js";
import { Images } from "../utils/images.js";
import HeartProgressBar from "../commonComponents/heartProgress/index.js";

const { width } = Dimensions.get("window");
const curveHeight = width / 6; // Reduced depth of the U shape
const dayarr = [
    { id: 1, day: "Today" },
    { id: 2, day: "Yesterday" },
    { id: 3, day: "Tomorrow" }
];

const types = [
    { id: 1, type: "Love", color: "red" },
    { id: 2, type: "Compatibility", color: "purple" },
    { id: 2, type: "Friendship", color: "orange" },
    { id: 3, type: "Health", color: "green" },
    { id: 3, type: "Dominance", color: "brown" },
    { id: 3, type: "Physical Compatibility", color: "teal" },
    { id: 3, type: "Temperament", color: "yellow" },
    { id: 3, type: "Destiny", color: "pink" },
];


const CompatabilityScore = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.screenContainer}>
                <View style={styles.imageWrapper}>
                    <ImageBackground source={Images.loginbg} style={styles.image}>
                        <Svg width={width} height={curveHeight} viewBox={`0 0 ${width} ${curveHeight}`} style={styles.curveSvg}>
                            <Path
                                d={`M 0 0 Q ${width / 2} ${curveHeight * 1.5} ${width} 0 L ${width} ${curveHeight} L 0 ${curveHeight} Z`}
                                fill={colors.lightgrey}
                            />
                        </Svg>
                        <View style={{ marginTop: 15 }}>
                            <HeartProgressBar progress={0.50} />

                        </View>
                        <View style={{ position: "absolute", top: "8%", left: "40%", transform: [{ translateX: -190 }], width: 380, height: 200 }}>
                            <Image
                                source={Images.couple}
                                style={{ width: "110%", height: "100%" }}
                            />
                        </View>


                    </ImageBackground>
                </View>
                {/* <Text style={styles.sectionTitle}>More Horoscope for </Text> */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayContainer}>
                    {types.map((item, index) => (
                        <View key={index} style={[styles.dayCard, {
                            height: 120,
                            width: 110,
                            alignItems: "center",
                            justifyContent: "center"
                        }]}>
                            <CircularProgressBar progress={"70"} size={45} color={item.color} />
                            <Text style={[styles.daystxt, { color: item.color }]}>{item.type}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.whitecard}>
                    <Text style={[styles.carddaystxt, { color: "red", marginBottom: 5 }]}>Love --Bhakoot Koot</Text>
                    <Text> It represents emotional bonding, harmony, and overall compatibility between partners. Bhakoot is considered a significant factor as it governs the couple’s prosperity, financial stability, and mutual well-being.</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "purple", marginBottom: 5 }]}>Compatibility --Varna Koot</Text>
                    <Text>Varna Koot in matchmaking checks the mental and emotional compatibility between partners. It classifies people into four groups based on their nature. A good Varna match ensures mutual understanding and a balanced relationship.</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "orange", marginBottom: 5 }]}>Friendship --Tara Koot</Text>
                    <Text>Graha Maitri Koot measures the intellectual and emotional compatibility between partners based on their ruling planets. A strong match indicates mutual understanding, effective communication, and a harmonious relationship.</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "green", marginBottom: 5 }]}>Health --Nadi Koot</Text>
                    <Text>Naadi Koot in matchmaking assesses genetic compatibility and health factors between partners. It helps prevent potential conflicts related to health and offspring. A match in the same Naadi is generally avoided for better marital harmony.</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "brown", marginBottom: 5 }]}>Dominance --Vasya Koot	</Text>
                    <Text>Vasya Koot determines mutual attraction and control between partners. It ensures harmony and balance in a relationship. Higher compatibility leads to a stronger bond..</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "teal", marginBottom: 5 }]}>Physical compatibility --Yoni Koot</Text>
                    <Text> Yoni Koot represents physical and emotional compatibility between partners. It is based on animal symbolism, influencing intimacy and understanding. A higher score ensures better harmony in marriage.</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "#E4C16F", marginBottom: 5 }]}>Temperament --Gana Koot</Text>
                    <Text>Gana Koot determines the temperament and nature compatibility between partners. It classifies individuals into Deva (gentle), Manushya (balanced), and Rakshasa (aggressive) categories. A good match ensures harmony and fewer conflicts in marriage.</Text>
                </View>
                <View style={[styles.whitecard, { marginTop: 10 }]}>
                    <Text style={[styles.carddaystxt, { color: "pink", marginBottom: 5 }]}>Destiny --Tara Koot</Text>
                    <Text> Tara Koot in matchmaking analyzes the health, well-being, and longevity of partners. It assesses compatibility based on birth stars (Tara) to ensure a harmonious and prosperous relationship. A high Tara Koot score indicates stability and good fortune.</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.lightgrey,
        alignItems: "center",
        marginBottom: 10
    },
    imageWrapper: {
        width: "100%",
        height: width / 1.5, // Adjust height as needed
        overflow: "hidden",
        position: "relative", // Ensures curve stays at the bottom
    },
    image: {
        width: "100%",
        height: "100%",
    },
    curveSvg: {
        position: "absolute",
        bottom: -1, // Ensures smooth alignment
        left: 0,
    },
    card: {
        width: "95%",
        backgroundColor: "rgba(189, 44, 60, 0.9)", // 50% opacity
        borderRadius: 8,
        // zIndex: 1,
        marginTop: -50,
        padding: 15,
    },
    whitecard: {
        width: "95%",
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 15,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    predictiontxt: {
        fontSize: 14,
        color: colors.white,
        fontWeight: "400",
        marginTop: 10,
    },
    daytext: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold",
    },
    dayContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 8
    },
    dayCard: {

        borderRadius: 8,
        marginHorizontal: 10,
        backgroundColor: "white",
        padding: 10,
        // justifyContent: "center",
        // alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    todaytxt: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.red,
        marginTop: 5
    },
    daystxt: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 5
    },
    carddaystxt: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5

    },
    datetxt: {
        fontSize: 15,
        fontWeight: "400",
        color: colors.black,
        marginTop: 4
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.black,
        marginTop: 20,
        // textAlign: "",
    },
    detailsCard: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    detailsText: {
        fontSize: 14,
        color: colors.black,
        textAlign: "center",
    },
});

export default CompatabilityScore;
