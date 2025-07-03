import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');

const TipsDetailScreen = () => {
    const route = useRoute();
    // const { item } = route.params;

    return (
        <View style={styles.container}>
            <CommonHeader name="Tip Details" />
            <ScrollView contentContainerStyle={styles.content}>
                {/* Optional image display */}
                {/* {item.img && (
                    <Image source={item.img} style={styles.image} resizeMode="cover" />
                )} */}

                <Text style={styles.title}>Tips based on the planet position on your Birth chart</Text>
                <Text style={styles.description}>Who can follow this remedy:

                    Anyone whose 2nd house is owned by Venus and has Ketu placed in that house, or if Venus is the lord of the 2nd house and is influenced by Ketu, can adopt this remedy.

                    When Ketu sits in the 2nd house and gives negative effects, it affects the general significations of the 2nd house such as wealth, speech, and family. This may lead to financial issues, monetary shortages, situations where one cannot keep their word, divisions in the family, or difficulties in forming a family. If remedies have been tried with no results and you're in distress, then ultimately you should turn to Vanchakalpa Ganapati.

                    Remedy Procedure:

                    Begin this remedy on a Monday.

                    Create a small homa (fire) pit, sit facing north, and offer oblations into the fire while chanting the Vanchakalpa Ganapati mantra 108 times daily.

                    Within just 15 days, you will start seeing positive changes and progress.

                    If you cannot perform a homa:

                    Light a traditional lamp with coconut oil and place five wicks in it.

                    Sit in front of the lamp and chant the mantra 108 times daily.

                    The positive changes and transformation you experience will be immeasurable.

                    The Vanchakalpa Ganapati mantra is a composite of Maha Ganapati, Saubhagya Panchadasi, and Gayatri Mantra. While offering it into the fire, use puffed rice (nel pori) as the offering.

                    Do this and experience the benefits.</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    content: {
        padding: 16,
    },
    image: {
        width: width - 32,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.darkGrey || '#333',
    },
});

export default TipsDetailScreen;
