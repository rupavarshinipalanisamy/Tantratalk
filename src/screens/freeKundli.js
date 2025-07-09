import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { commonstyles } from '../commonComponents/commonStyles';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import CustomDatePicker from '../commonComponents/commonDatePicker';
import { ScreenName } from '../utils/screenName';
import { useFormik } from 'formik';
import { useLazySearchCitiesQuery } from '../redux/services/api/backendapi';
import Loader from '../commonComponents/loader';

const FreeKundli = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSubmit = () => {
        navigation.navigate(ScreenName.freeKudliDetails)
    };

    const formik = useFormik({
        initialValues: {
            name:'',
            contact: '',
            password: ''
        },
        // validationSchema: password,
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });
    const [triggerSearch, { data: suggestions = [], isLoading, isError, isFetching }] = useLazySearchCitiesQuery();
    useEffect(() => {
        if (!query) {
            setShowSuggestions(false);
            return;
        }

        const delayDebounce = setTimeout(() => {
            triggerSearch(query);
            setShowSuggestions(true);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);


    const handleSelectCity = (city) => {
        setQuery(city);
        setShowSuggestions(false);
    };


    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Free Kundli" />
            <ImageBackground source={Images.loginbg} style={styles.backgroundContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100} // adjust this value if header overlaps
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                    // keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.headertxtContainer}>
                            <Text style={styles.headertxt}>Enter your Birth Details & get your</Text>
                            <Text style={styles.headertxt}>Kundli details</Text>
                        </View>
                        <View style={styles.centeredContent}>
                            <View style={styles.card}>
                                <View style={{ marginTop: 30 }}>
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
  value={selectedGender}
  onChange={setSelectedGender}
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
                                        <CustomDatePicker
                                            onSelectDate={(date) => setSelectedDate(date)}
                                            isLabel={true}
                                            label="Time of Birth"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <InputField
                                            isLabel={true}
                                            label="Birth place"
                                            placeholder="Search city"
                                            value={query}
                                            onChange={setQuery}
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
                                                            <Text style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee', color: 'black' }}>
                                                                {item}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            )
                                        )}
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                            <Text style={styles.submitButtonText}>SUBMIT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.resetBtn} onPress={handleSubmit}>
                                            <Text style={styles.resetButtonText}>RESET</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View >
    );
};

export default FreeKundli;

const styles = StyleSheet.create({
    backgroundContainer: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "space-between",
        paddingBottom: 20, // Ensures spacing at bottom
    },
    headertxtContainer: {
        position: "absolute",
        top: "5%", // Adjust to move higher or lower
        alignSelf: "center",
        alignItems: "center",
    },

    headertxt: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500"
    },
    inputlabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: colors.black1,
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
        // borderTopRightRadius: 40,
        // borderTopLeftRadius: 40,
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
