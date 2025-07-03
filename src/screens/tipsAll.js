import React from 'react';
import { View, FlatList, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import { ScreenName } from '../utils/screenName';
import { DailyHoroData } from '../utils/Datas/DailyHoroscope';
import { useTranslation } from 'react-i18next';
import { RemediesDataAll } from '../utils/Datas/Remedies';
import { TipsAllData } from '../utils/Datas/tipsAllData';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const itemWidth = screenWidth -25; // Adjust width for spacing
const itemHeight = screenHeight * 0.18; // Dynamic height (20% of screen height)

const TipsAll = ({ navigation }) => {
    const { t } = useTranslation();

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(ScreenName.tipslistscreen)} >
                    <ImageBackground source={item.img} style={[styles.image, { height: itemHeight }]}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{t(item.name)}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.screenContainer}>
            <CommonHeader name="Tantra Tips" />
            <FlatList
                data={TipsAllData}
                numColumns={1}
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
    },
    text: {
        fontSize: 12,
        fontWeight: "500",
        color: colors.white,
    }
});

export default TipsAll;
