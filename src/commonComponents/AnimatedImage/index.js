import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet } from "react-native";

const AnimatedImage = ({ source, startX, endX, duration, style }) => {
    const translateX = useRef(new Animated.Value(startX)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: endX,
            duration: duration || 2000, // Default 2 seconds
            useNativeDriver: true,
        }).start();
    }, []);

    return <Animated.Image source={source} style={[styles.animatedImage, { transform: [{ translateX }] }, style]} />;
};

const styles = StyleSheet.create({
    animatedImage: {
        position: "absolute",
        width: "35%",
        height: "40%",
        top: "10%", // Adjust as needed
    },
});

export default AnimatedImage;
