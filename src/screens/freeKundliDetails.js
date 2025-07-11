import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { commonstyles } from "../commonComponents/commonStyles";
import { colors } from "../utils/colors";
import { CommonHeader } from "../commonComponents/components";
import BasicDetails from "./BasicDetails";

const FreeKudliDetails = ({ route }) => {
    const [selectedTab, setSelectedTab] = useState("Basic"); // Default to "Basic" tab
    const { kundliData } = route.params;
    console.log('====================================');
    console.log(kundliData);
    console.log('====================================');
    const renderContent = () => {
        switch (selectedTab) {
            case "Basic":
                return <BasicDetails kundliData={kundliData} />;
            case "Charts":
                return <Text style={styles.contentText}>Charts Content</Text>;
            case "Report":
                return <Text style={styles.contentText}>Report Content</Text>;
            default:
                return null;
        }
    };

    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Free Kundli" />

            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
                {["Basic", "Charts", "Report"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab ? styles.activeTabText : styles.inactiveTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginBottom: 10,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "rgba(189, 44, 60, 0.9)",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    activeTabText: {
        color: colors.white, // Selected tab text color
    },
    inactiveTabText: {
        color: "black", // Non-selected tab text color
    },
    contentContainer: {
        padding: 20,
    },
    contentText: {
        fontSize: 18,
        textAlign: "center",
        marginVertical: 20,
        fontWeight: "bold",
        color: "#333",
    },
    bookPoojaText: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "bold",
    },
});

export default FreeKudliDetails;
