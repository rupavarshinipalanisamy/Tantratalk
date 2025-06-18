import React from 'react';
import { View, FlatList, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { ScreenName } from '../utils/screenName';
import { DailyHoroData } from '../utils/Datas/DailyHoroscope';
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const itemWidth = screenWidth / 2 - 18; // Adjust width for spacing
const itemHeight = screenHeight * 0.22; // Dynamic height (20% of screen height)

const services = [
    { id: '1', name: 'Astrology', img: Images.astroconul },
    { id: '2', name: 'Kerala Prasanm', img: Images.astroconul },
    { id: '3', name: 'Numerology', img: Images.astroconul },
    { id: '4', name: 'Vasthu', img: Images.astroconul }
];

const DailyHoroscope = ({ navigation }) => {
    const { t } = useTranslation();

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(ScreenName.horoScope, { item })} >
                    <ImageBackground source={item.img} style={[styles.image, { height: itemHeight }]}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{t(item.title1)}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.screenContainer}>
            <CommonHeader name="Daily Horoscope" />
            <FlatList
                data={DailyHoroData}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        width: itemWidth,
        margin: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        marginTop: 10
    },
    image: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        padding: 12,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.white,
    }
});

export default DailyHoroscope;
