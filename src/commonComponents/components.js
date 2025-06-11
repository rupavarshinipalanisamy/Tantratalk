import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../utils/colors';
import { useDispatch } from 'react-redux';
import { navbarOpenState } from '../redux/slices/sideNavBar';
import { Images } from '../utils/images';
import Svg, { Path } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../utils/screenName';
export const CommonHeader = ({ name, showBackButton = false }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 60,
            backgroundColor: colors.red,
            padding: 10
        }}>
            {/* Left Drawer Icon & App Name */}
            <View style={styles.leftSection}>
                {showBackButton ? (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => dispatch(navbarOpenState(true))}>
                        <Icon name="menu" size={24} color="white" />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{name}</Text>
            </View>
            {/* Right Icons: Cart & Notifications */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate(ScreenName.cartScreen)}>
                    <Icon name="cart-outline" size={17} color="white" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.iconContainer, { marginLeft: 15 }]}>
                    <Icon name="bell-outline" size={18} color="white" />
                </TouchableOpacity> */}
            </View>
        </View>
    )
}



export const BottomNavigator = () => {
    const [activeTab, setActiveTab] = useState('list'); // Initial active tab
    const { width } = Dimensions.get("window");
    return (
        <View style={{ position: "relative", width: "100%", height: 90 }}>
            {/* Bottom Navigation Bar with Curved Cutout */}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: 80,
                    backgroundColor: "white",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    elevation: 6,
                    overflow: "hidden",
                }}
            >
                {/* SVG Bowl Cutout */}
                <Svg
                    width={width}
                    height="90"
                    viewBox={`0 0 ${width} 80`}
                    style={{ position: "absolute", top: -25 }}
                >
                    <Path
                        fill="white"
                        stroke="#ddd" // Border color for smooth edges
                        strokeWidth="2" // Border thickness
                        d={`
                M0,0 
                H${width / 2 - 70} 
                Q${width / 2 - 50},60 ${width / 2},60 
                Q${width / 2 + 50},60 ${width / 2 + 70},0 
                H${width} 
                V80 
                H0 
                Z
              `}
                    />
                </Svg>
            </View>

            {/* Floating Action Button (FAB) */}
            <View
                style={{
                    position: "absolute",
                    bottom: 35,
                    left: "50%",
                    transform: [{ translateX: -35 }],
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 8, // Shadow for Android
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                }}
            />
        </View>
    );
};

export const LineTextInput = ({
    label = '',
    // labelFontWeight = 'normal',
    placeholder = '',
    value = '',
    borderColor = '',
    onChange = () => false,
    isError = false,
    onBlur,
    type = 'default',
    fullWidth = false,
    parentProps = {},
    disabled = false,
    KeyClick = () => null,
    isLabel = false,
    name,
    autofocus = false,
    style = {},
    multiline = false,
    onFocus = () => null,
    isUpperCase = false,
    maxLength = 1000,
    textColor = 'black',
    placeholderTextColor = '#afafaf',
    borderWidth = 1,
    secureTextEntry = false
}) => {
   return (
    <View style={{ width: "100%" }}>
        <>
            {isLabel && (
                <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color:colors.grey2,
                    marginBottom:-2, // Reduced space between label and input
                }}>
                    {label}
                </Text>
            )}
            <TextInput
                value={value?.toString()}
                onChangeText={onChange}
                placeholder={placeholder}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.grey4,
                    paddingVertical: 2,
                    marginTop:0
                }}
            />
        </>
    </View>
);

}
const styles = StyleSheet.create({

    leftSection: {
        flexDirection: "row",
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
    },
    rightSection: {
        flexDirection: "row",
    },
    iconContainer: {
        height: 35,
        width: 35,
        borderRadius: 25,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignItems: "center", justifyContent: "center"
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        // color: colors.red,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light gray background
        borderRadius: 30, // More rounded corners
        paddingVertical: 12, // Slightly increased padding
        paddingHorizontal: 20,
        margin: 10,
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android shadow
    },
    tab: {
        padding: 10,
        borderRadius: 25, // Slightly more rounded tabs
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerTab: {
        backgroundColor: '#28a745', // Green background
        borderRadius: 35, // More rounded center tab
        padding: 18, // Increased padding
        shadowColor: '#000', // Add shadow to center tab
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 7, // More pronounced shadow for center tab
        zIndex: 1,
    },
    activeTab: {
        backgroundColor: '#e0e0e0', // Slightly darker gray for active tabs
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: '#888', // Gray tint for inactive icons
    },
    centerIcon: {
        width: 30,
        height: 30,
        tintColor: '#fff', // White tint for the center icon
    },
    centerContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    curve: {
        position: 'absolute',
        top: -20, // Adjust to position the curve correctly
        width: 80,
        height: 30,
        backgroundColor: '#f0f0f0', // Background color of the container
        borderRadius: 40, // Create the curve using border radius
    },
    textBox: {
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: 'black',
        width: '100%',
        backgroundColor: colors.lightgrey,
        borderBottomWidth: 1,
        borderBottomColor: colors.red
        // marginBottom: 10,
    },

});
