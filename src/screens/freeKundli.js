import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity,
    FlatList, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker from '../commonComponents/commonDatePicker';
import { ScreenName } from '../utils/screenName';
import { useFormik } from 'formik';
import { useLazySearchCitiesQuery, useLazyGetCoordinatesQuery, useKundliQuery } from '../redux/services/api/backendapi';
import { skipToken } from '@reduxjs/toolkit/query';
import Loader from '../commonComponents/loader';
import { DropdownField } from "../commonComponents/DropDown/index";
import TimePickerModalField from '../commonComponents/commonTimePicker';

const FreeKundli = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [userTyped, setUserTyped] = useState(false);


    const [triggerSearch, { data: suggestions = [], isFetching }] = useLazySearchCitiesQuery();
    const [triggerGetCoordinates, { data: coordinateData }] = useLazyGetCoordinatesQuery();
    const handleSubmit = () => {
        console.log('DATETIME:', formik.values.datetime);
        console.log('COORDINATES:', formik.values.coordinates);

        if (formik.values.coordinates && formik.values.datetime) {
            console.log(kundliData,"kundliDatas");
            
            navigation.navigate(ScreenName.freeKudliDetails, {
                kundliData,
            });
        } else {
            alert("Please complete all fields");
        }
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            contact: '',
            password: '',
            gender: '',
            datetime: '',
            coordinates: '',
        },
        onSubmit: handleSubmit

    });

    // Format datetime
    useEffect(() => {
        if (selectedDate && selectedTime) {
            try {
                const [timeStr, meridian] = selectedTime.split(' '); // "10:00", "PM"
                let [hours, minutes] = timeStr.split(':').map(Number);

                if (meridian === 'PM' && hours !== 12) hours += 12;
                if (meridian === 'AM' && hours === 12) hours = 0;

                const [year, month, day] = selectedDate.split('-').map(Number);
                const datetime = new Date(year, month - 1, day, hours, minutes);

                // Final check: datetime should be valid
                if (!isNaN(datetime.getTime())) {
                    formik.setFieldValue('datetime', datetime.toISOString());
                } else {
                    console.warn('Invalid datetime format');
                }
            } catch (error) {
                console.error("Error parsing datetime:", error);
            }
        }
    }, [selectedDate, selectedTime]);



    // Update coordinates from city selection
    useEffect(() => {
        console.log(coordinateData, "coordinateDatass");

        if (coordinateData?.latitude && coordinateData?.longitude) {
            const coords = `${coordinateData.latitude},${coordinateData.longitude}`;
            console.log("✅ Setting coordinates:", coords);
            formik.setFieldValue('coordinates', coords);
        } else {
            console.log("⏳ Waiting for coordinateData...");
        }
    }, [coordinateData]);


    // City search with debounce
    useEffect(() => {
        if (!query || !userTyped) {
            setShowSuggestions(false);
            return;
        }

        const delayDebounce = setTimeout(() => {
            triggerSearch(query);
            setShowSuggestions(true);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query, userTyped]);

    const handleSelectCity = (city) => {
        setQuery(city);
        setUserTyped(false); // prevent retriggering the API
        setShowSuggestions(false);
        triggerGetCoordinates({ cityname: city });
    };


    // Kundli Query only when datetime & coordinates are set
    const { data: kundliData, isLoading: kundliisLoading } = useKundliQuery(
        formik.values.coordinates && formik.values.datetime
            ? {
                coordinates: formik.values.coordinates,
                datetime: encodeURIComponent(formik.values.datetime),
                la: 'en',
            }
            : skipToken
    );



    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Free Kundli" />
            {kundliisLoading && <Loader />}
            <ImageBackground source={Images.loginbg} style={styles.backgroundContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.headertxtContainer}>
                            <Text style={styles.headertxt}>Enter your Birth Details & get your</Text>
                            <Text style={styles.headertxt}>Kundli details</Text>
                        </View>
                        <View style={styles.centeredContent}>
                            <View style={styles.card}>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ color: 'black' }}>Datetime: {formik.values.datetime}</Text>
                                    <Text style={{ color: 'black' }}>Coordinates: {formik.values.coordinates}</Text>

                                    <InputField
                                        isLabel={true}
                                        label="Name"
                                        fullWidth={true}
                                        borderColor="#00b1f3"
                                        onBlur={formik.handleBlur('name')}
                                        value={formik.values.name}
                                        onChange={(value) => formik.setFieldValue('name', value)}
                                    />
                                    <DropdownField
                                        label="Gender"
                                        isLabel={true}
                                        value={formik.values.gender}
                                        onChange={(value) => formik.setFieldValue('gender', value)}
                                        options={['Male', 'Female', 'Other']}
                                        borderColor="#00b1f3"
                                    />

                                    <View style={{ marginTop: 10 }}>
                                        <CustomDatePicker
                                            onSelectDate={(date) => setSelectedDate(date)}
                                            isLabel={true}
                                            label="Date of Birth"
                                        />
                                    </View>

                                    <View style={{ marginTop: 10 }}>
                                        <TimePickerModalField
                                            label="Time of Birth"
                                            value={selectedTime}
                                            onTimeChange={(time) => setSelectedTime(time)}
                                        />
                                    </View>

                                    <View style={{ marginTop: 10 }}>
                                        <InputField
                                            isLabel={true}
                                            label="Birth place"
                                            placeholder="Search city"
                                            value={query}
                                            onChange={(value) => {
                                                setUserTyped(true); // mark that user typed
                                                setQuery(value);
                                            }}
                                            borderColor="#00b1f3"
                                        />

                                        {query.length > 0 && isFetching ? (
                                            <Loader />
                                        ) : (
                                            showSuggestions && suggestions.length > 0 && (
                                                <ScrollView
                                                    style={{ borderWidth: 1, borderColor: '#ddd', height: 150 }}
                                                    keyboardShouldPersistTaps="handled"
                                                >
                                                    {suggestions.map((item, index) => (
                                                        <TouchableOpacity key={index.toString()} onPress={() => handleSelectCity(item)}>
                                                            <Text style={{
                                                                padding: 10, borderBottomWidth: 1,
                                                                borderColor: '#eee', color: 'black'
                                                            }}>
                                                                {item}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            )
                                        )}
                                    </View>

                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                            style={styles.submitButton}
                                            onPress={() => setTimeout(() => formik.handleSubmit(), 200)}  // give enough time
                                        >
                                            <Text style={styles.submitButtonText}>SUBMIT</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.resetBtn} onPress={() => formik.resetForm()}>
                                            <Text style={styles.resetButtonText}>RESET</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
};

export default FreeKundli;

const styles = StyleSheet.create({
    backgroundContainer: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    headertxtContainer: {
        position: "absolute",
        top: "5%",
        alignSelf: "center",
        alignItems: "center",
    },
    headertxt: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500"
    },
    centeredContent: {
        marginTop: 120,
        alignItems: "center",
    },
    card: {
        width: "95%",
        backgroundColor: colors.white,
        padding: 20,
        elevation: 4,
        paddingVertical: 30,
        borderRadius: 8,
        alignSelf: "center",
    },
    submitButton: {
        backgroundColor: colors.red,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        width: "40%",
        marginTop: 15
    },
    resetBtn: {
        borderWidth: 1,
        borderColor: colors.red,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
        width: "40%",
        marginTop: 15,
        marginLeft: 10
    },
    submitButtonText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 16,
    },
    resetButtonText: {
        color: colors.red,
        fontWeight: "600",
        fontSize: 16,
    },
});
