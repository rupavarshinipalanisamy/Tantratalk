import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../utils/screenName';
import { TantraTips } from '../utils/Datas/tips';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardHeight = screenHeight * 0.25;

const TipsListScreen = () => {
    const navigation = useNavigation();

    const handlePress = (item) => {
        navigation.navigate(ScreenName.tipsdetailscreen, { item }); // Pass item if needed
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardWrapper} onPress={() => handlePress(item)}>
            <View style={styles.overlay}>
                <Text style={styles.subtitle}>{item.title}</Text>
                <TouchableOpacity style={{ borderColor: colors.grey5, alignSelf: "flex-end",borderWidth:1,borderRadius:5 }}
                onPress={()=>navigation.navigate(ScreenName.tipsdetailscreen)}
                >
                    <Text style={{fontSize:12,padding:5,color:colors.red}}>Read more</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <CommonHeader name="Tips" />
            <FlatList
                data={TantraTips}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    cardWrapper: {
        flexDirection: 'row',
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: colors.grey4,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 15,
    },
    overlay: {
        padding: 10,
        flex: 1,
    },
    title: {
        fontSize: 18,
        color: colors.black,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: colors.black,
        marginTop: 4,
    },
});

export default TipsListScreen;
