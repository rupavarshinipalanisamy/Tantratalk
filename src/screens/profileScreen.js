import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CommonHeader } from '../commonComponents/components';
import { commonstyles } from '../commonComponents/commonStyles';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import AppIcon from '../commonComponents/Icons/Icons';
import { ScreenName } from '../utils/screenName';
import { formatDate, getUserId } from '../utils/helper';
import { useGetUserQuery } from '../redux/services/auth/authSlice';

const ProfileScreen = ({ navigation }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);
    const {
        data: profileData,
        refetch: profileRefetch,
        status: profilestatus
    } = useGetUserQuery(userId);

    useEffect(() => {
        profileRefetch()
    }, [profileData])

    const handleEdit = () => {
        navigation.navigate(ScreenName.editProfile, {profileData: profileData,profileRefetch:profileRefetch});
    };

    return (
        <View style={commonstyles.screencontainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <CommonHeader name="Profile" />
                <View style={styles.backgroundContainer}>
                    <View style={styles.centeredContent}>
                        <View style={styles.card}>
                            <View style={styles.roundContainer}>
                                <Image source={Images.userimg} style={styles.profileImage} />
                            </View>
                            <Text style={styles.name}>{profileData?.user?.name}</Text>
                            <Text style={styles.info}>{profileData?.user?.contact}</Text>

                            <View style={styles.smallCard}>
                                <View style={{
                                    borderBottomColor: colors.grey1,
                                    borderBottomWidth: StyleSheet.hairlineWidth,

                                }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "500", color: colors.black }}>Personal Info</Text>
                                        <TouchableOpacity onPress={handleEdit}>

                                            <AppIcon name="edit" size={25} color={colors.red} library="MaterialIcons" />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {/* Name */}
                                <View style={styles.infoRow}>
                                    <AppIcon name="id-card-outline" size={25} color={colors.red} library="Ionicons" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Name</Text>
                                        <Text style={styles.details}>{profileData?.user?.name}</Text>
                                    </View>
                                </View>

                                {/* Date of Birth */}
                                <View style={styles.infoRow}>
                                    <AppIcon name="calendar-month-outline" size={25} color={colors.red} library="MaterialCommunityIcons" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Date of Birth</Text>
                                        <Text style={styles.details}>{formatDate(profileData?.user?.dateOfBirth)}</Text>
                                    </View>
                                </View>

                                {/* Time of Birth */}
                                <View style={styles.infoRow}>
                                    <AppIcon name="clock-outline" size={25} color={colors.red} library="MaterialCommunityIcons" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Time of Birth</Text>
                                        <Text style={styles.details}>{profileData?.user?.birthTime}</Text>
                                    </View>
                                </View>

                                {/* Place of Birth */}
                                <View style={styles.infoRow}>
                                    <AppIcon name="map-marker-outline" size={25} color={colors.red} library="MaterialCommunityIcons" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>Place of Birth</Text>
                                        <Text style={styles.details}>{profileData?.user?.location}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.smallCard}>
                                <TouchableOpacity style={[{ flexDirection: "row", alignItems: "center" }]} onPress={()=>navigation.navigate(ScreenName.languages)}>

                                    <AppIcon name="id-card-outline" size={25} color={colors.red} library="Ionicons" />
                                    <Text style={styles.cardheadertxt}>Languages</Text>

                                </TouchableOpacity>

                            </View>
                            <View style={styles.smallCard}>
                                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                                    <AppIcon name="shield-check-outline" size={25} color={colors.red} library="MaterialCommunityIcons" />
                                    <Text style={styles.cardheadertxt}>Privacy and Policy</Text>

                                </View>

                            </View>
                            <View style={styles.smallCard}>
                                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                                    <AppIcon name="logout" size={25} color={colors.red} library="MaterialIcons" />
                                    <Text style={styles.cardheadertxt}>Log out</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

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
        backgroundColor: colors.lightgrey,
        height: "100%",
        padding: 20,
        elevation: 4,
        alignItems: "center",
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
        fontSize: 18,
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
        fontWeight: "bold",
    },
    details: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.black1,
    },
    cardheadertxt: {
        marginLeft: 10,
        color: colors.black
    }
});

export default ProfileScreen;
