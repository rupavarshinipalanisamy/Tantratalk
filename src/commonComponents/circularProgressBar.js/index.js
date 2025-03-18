import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularProgressBar = ({
    progress = 50,
    size = 30,  // Reduced size
    strokeWidth = 3,  // Adjusted stroke width
    color = "#4CAF50",
    backgroundColor = "#E0E0E0"
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background Circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress Circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
            {/* Progress Text */}
            <Text style={[styles.text, { fontSize: size / 5 }]}>{progress}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        position: "absolute",
        fontWeight: "bold",
        color: "#333",
    },
});

export default CircularProgressBar;
