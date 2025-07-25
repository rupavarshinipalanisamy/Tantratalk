import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, Platform } from "react-native";
import { Images } from "../utils/images";
import { colors } from "../utils/colors";
import { commonstyles } from "../commonComponents/commonStyles";

const basicDetails = [
    { label: "Name", value: "Balaji" },
    { label: "Date", value: "13 February 1997" },
    { label: "Time", value: "04:36 PM" },
    { label: "Place", value: "Tiruppur, Tamil Nadu, India" },
    { label: "Latitude", value: "11.12" },
    { label: "Longitude", value: "77.35" },
];
const AdditionalDetails = [
    { label: "Deity", value: "Vayu, Pawan (North)" },
    { label: "Ganam", value: "Deva" },
    { label: "Symbol", value: "Coral" },
    { label: "AnimalSign", value: "Buffalo" },
    { label: "Nadi", value: "Kapha" },
    { label: "Color", value: "Black" },
    { label: "EnemyYoni", value: "Horse" },
    { label: "Planet", value: "Rahu" },
];
const BasicDetails = ({ kundliData }) => {
    console.log(kundliData, "InBAsicdetails");
    const nakshatraDetails = kundliData?.data
        ? [
            {
                label: "Nakshatra",
                value: kundliData.data.nakshatra?.name || "-",
            },
            {
                label: "Nakshatra Pada",
                value: kundliData.data.nakshatra?.pada?.toString() || "-",
            },
            {
                label: "Nakshatra Lord",
                value: kundliData.data.nakshatra?.lord?.name || "-",
            },
            {
                label: "Chandra Rasi",
                value: kundliData.data.chandra_rasi?.name || "-",
            },
            {
                label: "Chandra Rasi Lord",
                value:
                    kundliData.data.chandra_rasi?.lord?.name +
                    (kundliData.data.chandra_rasi?.lord?.vedic_name
                        ? ` (${kundliData.data.chandra_rasi.lord.vedic_name})`
                        : "") || "-",
            },
            {
                label: "Soorya Rasi",
                value: kundliData.data.soorya_rasi?.name || "-",
            },
            {
                label: "Soorya Rasi Lord",
                value:
                    kundliData.data.soorya_rasi?.lord?.name +
                    (kundliData.data.soorya_rasi?.lord?.vedic_name
                        ? ` (${kundliData.data.soorya_rasi.lord.vedic_name})`
                        : "") || "-",
            },
            {
                label: "Zodiac",
                value: kundliData.data.zodiac?.name || "-",
            },
        ]
        : [];

    const AdditionalDetails = kundliData?.data?.additional_info
        ? [
            {
                label: "Deity",
                value: kundliData.data.additional_info.deity || "-",
            },
            {
                label: "Ganam",
                value: kundliData.data.additional_info.ganam || "-",
            },
            {
                label: "Symbol",
                value: kundliData.data.additional_info.symbol || "-",
            },
            {
                label: "Animal Sign",
                value: kundliData.data.additional_info.animal_sign || "-",
            },
            {
                label: "Nadi",
                value: kundliData.data.additional_info.nadi || "-",
            },
            {
                label: "Color",
                value: kundliData.data.additional_info.color || "-",
            },
            {
                label: "Enemy Yoni",
                value: kundliData.data.additional_info.enemy_yoni || "-",
            },
            {
                label: "Planet",
                value: kundliData.data.additional_info.planet || "-",
            },
        ]
        : [];

    return (
        <View style={commonstyles.screencontainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Title Text */}
                <Text style={styles.title}>Basic Details</Text>
                <View style={styles.imageContainer}>
                    <View style={styles.imageWrapper}>
                        <ImageBackground
                            source={Images.loginbg}
                            style={styles.imgbackground}
                            resizeMode="cover"
                            imageStyle={styles.imageBorder}
                        >
                            <View style={styles.overlay}>
                                <View style={styles.container}>
                                    {basicDetails.map((item, index) => (
                                        <View key={index} style={styles.row}>
                                            <Text style={styles.label}>{item.label}</Text>
                                            <Text style={styles.value}>{item.value}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>

                {/* Nakshatra Details Section */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.title}>Nakshatra Details</Text>
                    <View style={styles.nakshatraContainer}>
                        {nakshatraDetails.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.row
                                ]}
                            >
                                <Text style={styles.nakshatraLabel}>{item.label}</Text>
                                <Text style={styles.nakshatraValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.title}>Additional Details</Text>
                    <View style={styles.nakshatraContainer}>
                        {AdditionalDetails.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.row
                                ]}
                            >
                                <Text style={styles.nakshatraLabel}>{item.label}</Text>
                                <Text style={styles.nakshatraValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.red,
    },
    imageContainer: {
        width: "100%",
        marginTop: 10,
        alignSelf: "center",
        borderRadius: 15,
        overflow: Platform.OS === "ios" ? "hidden" : "visible", // Needed for iOS
    },
    imageWrapper: {
        borderRadius: 15,
        overflow: "hidden",
    },
    imgbackground: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    imageBorder: {
        borderRadius: 15,
    },
    overlay: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        borderRadius: 10,
        paddingVertical: 5,
    },
    row: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    label: {
        width: "50%",
        fontSize: 16,
        fontWeight: "600",
        color: colors.white,
        textAlign: "left",
    },
    value: {
        width: "60%", // Ensures values start at the same point
        fontSize: 16,
        color: colors.white,
        textAlign: "left", // Aligns with label for a uniform look
    },
    nakshatraContainer: {
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
        // elevation: , 
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.red
    },
    evenRow: {
        backgroundColor: "#fff",
    },
    oddRow: {
        backgroundColor: "#fdf5c4", // Light yellow background
    },
    nakshatraLabel: {
        // flex: 1,
        width: "50%",
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    nakshatraValue: {
        flex: 2,
        fontSize: 16,
        color: "#000",
        textAlign: "left",
    },
});

export default BasicDetails;