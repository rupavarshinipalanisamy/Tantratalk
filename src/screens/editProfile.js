import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker from '../commonComponents/commonDatePicker';
import { useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { formatDate, getUserId, getUserToken } from '../utils/helper';
import CommonTimePicker from '../commonComponents/TimePicker';
import TimePickerModalField from '../commonComponents/commonTimePicker';
import { useGetUserQuery, useUpdateUserMutation } from '../redux/services/auth/authSlice';
import Loader from '../commonComponents/loader';

const EditProfile = ({ route }) => {
    // const { profileData, profileRefetch } = route.params;

    console.log(profileData);
    const [selectedDate, setSelectedDate] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const [loading, setLoading] = useState(false)


    const [editProfile] = useUpdateUserMutation();
    useEffect(() => {
        const fetchUserToken = async () => {
            const token = await getUserToken();
            setUserToken(token);
        };
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId()
        fetchUserToken();
    }, []);

    const {
        data: profileData,
        refetch: profileRefetch,
        status: profilestatus,
        isLoading: profileLoading,
        isFetching:Profilefetching
    } = useGetUserQuery(userId, {
        skip: !userId, // ✅ Don't call until userId is available
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: profileData?.user?.name || '',
            contact: profileData?.user?.contact || '',
            dateOfBirth: profileData?.user?.dateOfBirth || '',
            birthTime: profileData?.user?.birthTime || '',
        },
        onSubmit: (values) => handleEditProfile(values),
    });

    useEffect(() => {
        console.log(formatDate(profileData?.user?.dateOfBirth), "dateofbirthhh");
    }, [profileData])


    const handleEditProfile = async () => {
        const payload = {
            name: formik.values.name,           // backend expects 'name'
            contact: formik.values.contact,     // backend expects 'contact'
            dateOfBirth: selectedDate ? selectedDate : formik.values.dateOfBirth,
            birthTime: formik.values.birthTime
        };
        console.log(payload, "payloadsss");

        setLoading(true)
        try {
            const response = await editProfile({
                userId: userId,
                userData: payload,
                token: userToken
            }).unwrap();
            profileRefetch()
            console.log('Profile updated successfully:', response);
        } catch (error) {
            setLoading(false)

            console.error('Failed:', error);
        } finally {
            setLoading(false)

        }
    };


    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Edit Profile" />
            {loading && <Loader />}
            <View style={styles.backgroundContainer}>
                <View style={styles.centeredContent}>
                    <View style={styles.card}>
                        <View style={{ alignItems: "center" }}>
                            <View style={styles.roundContainer}>
                                <Image source={Images.userimg} style={styles.profileImage} />
                            </View>
                            <Text style={styles.name}>{profileData?.user?.name}</Text>
                            <Text style={styles.info}>{profileData?.user?.contact}</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View>
                                <InputField
                                    isLabel={true}
                                    label="Full Name"
                                    fullWidth={true}
                                    borderColor="#00b1f3"
                                    onBlur={formik.handleBlur('name')}
                                    value={formik.values.name}
                                    onChange={(value) => formik.setFieldValue('name', value)}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <InputField
                                    isLabel={true}
                                    label="Phone number"
                                    fullWidth={true}
                                    borderColor="#00b1f3"
                                    onBlur={formik.handleBlur('contact')}
                                    value={formik.values.contact}
                                    onChange={(value) => formik.setFieldValue('contact', value)}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <CustomDatePicker
                                    onSelectDate={(date) => setSelectedDate(date)}
                                    isLabel={true}
                                    label="Date of Birth"
                                    value={formik.values.dateOfBirth}
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TimePickerModalField
                                    label="Time of Birth"
                                    value={formik.values.birthTime}
                                    onTimeChange={(formattedTime) => {
                                        formik.setFieldValue("birthTime", formattedTime);
                                    }}
                                />

                            </View>
                        </View>
                        <View style={{ justifyContent: "flex-end", flex: 1 }}>

                            <TouchableOpacity style={styles.submitButton} onPress={formik.handleSubmit}>
                                <Text style={styles.submitButtonText}>SUBMIT</Text>
                            </TouchableOpacity>
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
    submitButton: {
        backgroundColor: colors.red,
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 20,
    },
    submitButtonText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 16,
    },
});
