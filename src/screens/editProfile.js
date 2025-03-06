import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker, { CommonDatePicker } from '../commonComponents/commonDatePicker';


const EditProfile = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name=" Edit Profile" />
            <View style={styles.backgroundContainer}>
                <View style={styles.centeredContent}>
                    <View style={styles.card}>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.roundContainer}>
                                <Image source={Images.userimg} style={styles.profileImage} />
                            </View>
                            <Text style={styles.name}>John Doe</Text>
                            <Text style={styles.info}>johndoe@example.com</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View>
                                <InputField isLabel={true} label="Full Name" borderColor="#00b1f3" />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <InputField isLabel={true} label="Phone number" borderColor="#00b1f3" />
                            </View>
                            <View style={{ marginTop: 10 }}>

                                <CustomDatePicker
                                    onSelectDate={(date) => setSelectedDate(date)}
                                    isLabel={true}
                                    label="Date of Birth"
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>

                                <InputField isLabel={true} label="Phone number" borderColor="#00b1f3" />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default EditProfile;
const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "rgba(189, 44, 60, 0.2)",
        flex: 1,
        width: "100%",
    },
    centeredContent: {
        marginTop: 120,
        alignItems: "center",
    },
    card: {
        width: "100%",
        backgroundColor: colors.white,
        height: "100%",
        padding: 20,
        elevation: 4,
        // alignItems: "center",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    smallCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 8,
        elevation: 1,
        padding: 15,
        marginTop: 20,
    },
    roundContainer: {
        height: 120,
        width: 120,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        elevation: 4,
        marginTop: -80,
    },
    profileImage: {
        height: 120,
        width: 120,
        resizeMode: "contain",
        borderRadius: 50,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.black,
        marginTop: 10,
    },
    info: {
        fontSize: 14,
        color: colors.grey1,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        // borderBottomColor: colors.grey1,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 10,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    title: {
        fontSize: 12,
        color: colors.grey2,
        // fontWeight: "bold",
    },
    details: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.black1,
    },
});
