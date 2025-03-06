import React from 'react';
import { View, Text,StyleSheet ,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Icons
import { colors } from '../utils/colors';
import { useDispatch } from 'react-redux';
import { navbarOpenState } from '../redux/slices/sideNavBar';
export const CommonHeader = ({name}) => {
    const dispatch = useDispatch()
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height:60,
            backgroundColor:colors.red,
            padding:10
        }}>
            {/* Left Drawer Icon & App Name */}
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={() => dispatch(navbarOpenState(true))}>
                    <Icon name="menu" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
            </View>
            {/* Right Icons: Cart & Notifications */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="cart-outline" size={17} color="white" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.iconContainer, { marginLeft: 15 }]}>
                    <Icon name="bell-outline" size={18} color="white" />
                </TouchableOpacity> */}
            </View>
        </View>
    )
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
});
