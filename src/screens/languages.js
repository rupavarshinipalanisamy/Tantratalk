import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import AppIcon from '../commonComponents/Icons/Icons';
import i18n from "../i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


const Languages = ({ navigation }) => {
    const STORE_LANGUAGE_KEY = 'settings.lang';
      const { t } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState('en'); // 'en' or 'ta'

    const handleLanguageChange = async (lang) => {
        setSelectedLanguage(lang);
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem(STORE_LANGUAGE_KEY, lang);
    };


const languages = [
    { label: 'English', value: 'en' },
    { label: 'தமிழ் (Tamil)', value: 'ta' },
    { label: 'മലയാളം (Malayalam)', value: 'ml' },
    { label: 'తెలుగు (Telugu)', value: 'te' },
    { label: 'ಕನ್ನಡ (Kannada)', value: 'kn' },
];


    return (
        <View style={styles.container}>
            <CommonHeader name="Languages" />

            <View style={styles.card}>
                <Text style={styles.heading}> {t("choose_language")}</Text>

                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.value}
                        style={styles.radioContainer}
                        onPress={() => handleLanguageChange(lang.value)}
                    >
                        <View style={styles.radioCircle}>
                            {selectedLanguage === lang.value && <View style={styles.selectedRb} />}
                        </View>
                        <Text style={styles.radioText}>{lang.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    card: { marginHorizontal: 20, marginTop: 20 },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 20,
        alignSelf: 'center',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    radioCircle: {
        height: 18,
        width: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRb: {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: colors.red,
    },
    radioText: {
        fontSize: 16,
        color: colors.black,
    },
});

export default Languages;
