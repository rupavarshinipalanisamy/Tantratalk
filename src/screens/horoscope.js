import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, Dimensions, Text, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../utils/colors";
import CircularProgressBar from "../commonComponents/circularProgressBar.js";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");
const curveHeight = width / 6; // Reduced depth of the U shape
const dayarr = [
    { id: 1, day: "today" },
    { id: 2, day: "yesterday" },
    { id: 3, day: "tomorrow" }
];
const types = [
    { id: 1, type: "love", color: "red" },
    { id: 2, type: "career", color: "blue" },
    { id: 3, type: "health", color: "green" }
];

const HoroScope = ({ route }) => {
    const { item } = route.params || {};
        const { t } = useTranslation();
    

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.screenContainer}>
                {/* Image Wrapper */}
                <View style={styles.imageWrapper}>
                    <ImageBackground source={item.img} style={styles.image}>
                        {/* Reduced U-Shaped Curve at Bottom */}
                        <Svg width={width} height={curveHeight} viewBox={`0 0 ${width} ${curveHeight}`} style={styles.curveSvg}>
                            <Path
                                d={`M 0 0 Q ${width / 2} ${curveHeight * 1.5} ${width} 0 L ${width} ${curveHeight} L 0 ${curveHeight} Z`}
                                fill={colors.lightgrey} // Background color for smooth blending
                            />
                        </Svg>
                    </ImageBackground>
                </View>

                {/* Card Section */}
                <View style={styles.card}>
                    <Text style={styles.daytext}>{t("today")}</Text>
                    <Text style={styles.predictiontxt}>
                        We’ve trained a model called ChatGPT which interacts in a conversational way.
                        The dialogue format makes it possible for ChatGPT to answer follow-up questions,
                        admit its mistakes, challenge incorrect premises, and reject inappropriate requests.
                    </Text>
                </View>

                {/* Horizontal Days List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayContainer}>
                    {dayarr.map((item, index) => (
                        <View key={index} style={[styles.dayCard, {
                            height: 70,
                            width: 120
                        }]}>
                            <Text style={styles.todaytxt}>{t(item.day)}</Text>
                            <Text style={styles.datetxt}>2 october</Text>
                        </View>
                    ))}
                </ScrollView>
                <Text style={styles.sectionTitle}>{t("morehoroscopefor")} {t(item.title1)}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayContainer}>
                    {types.map((item, index) => (
                        <View key={index} style={[styles.dayCard, {
                            height: 120,
                            width: 110,
                            alignItems: "center",
                            justifyContent: "center"
                        }]}>
                            <CircularProgressBar progress={"70"} size={45} color={item.color} />
                            <Text style={[styles.daystxt, { color: item.color }]}>{t(item.type)}</Text>
                            {/* <Text style={styles.datetxt}>2 october</Text> */}
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.whitecard}>
                <Text style={[styles.daystxt, { color:"red",marginBottom:5 }]}>{t("love")}</Text>
                    <Text> We’ve trained a model called ChatGPT which interacts in a conversational way.
                        The dialogue format makes it possible for ChatGPT to answer follow-up questions,
                        admit its mistakes, challenge incorrect premises, and reject inappropriate requests.</Text>
                </View>
                <View style={[styles.whitecard,{marginTop:10}]}>
                <Text style={[styles.daystxt, { color:"blue",marginBottom:5 }]}>{t("career")}</Text>
                    <Text> We’ve trained a model called ChatGPT which interacts in a conversational way.
                        The dialogue format makes it possible for ChatGPT to answer follow-up questions,
                        admit its mistakes, challenge incorrect premises, and reject inappropriate requests.</Text>
                </View>
                <View style={[styles.whitecard,{marginTop:10}]}>
                <Text style={[styles.daystxt, { color:"green",marginBottom:5 }]}>{t("health")}</Text>
                    <Text> We’ve trained a model called ChatGPT which interacts in a conversational way.
                        The dialogue format makes it possible for ChatGPT to answer follow-up questions,
                        admit its mistakes, challenge incorrect premises, and reject inappropriate requests.</Text>
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
        marginBottom:10
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
        fontSize: 14,
        fontWeight: "bold",
        color: colors.red,
        marginTop: 5
    },
    daystxt: {
        fontSize: 14,
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

export default HoroScope;
