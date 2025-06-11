import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonHeader } from '../commonComponents/components';
import { colors } from '../utils/colors';
import { AstrologersData } from '../utils/Datas/Astrologers';
import AppIcon from '../commonComponents/Icons/Icons';
import { ScreenName } from '../utils/screenName';

const astrologers = [
    { id: '1', name: 'Samrikasha', location: 'India', experience: '5 Years', image: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Vaibhav Sen', location: 'India', experience: '4 Years', image: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Nidhi Chopra', location: 'India', experience: '6 Years', image: 'https://via.placeholder.com/50' },
];

const Astrologers = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <CommonHeader name="Astrologers" />
            {/* Astrologer List */}
            <View style={{ paddingHorizontal: 12, flex: 1 }}>
                <FlatList
                    data={AstrologersData}
                    keyExtractor={(item) => item.id.toString()} 
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={{ alignItems: "center" }}>
                                <Image source={item?.img} style={{ height: 60, width: 60, borderRadius: 50, marginTop: 15 }} />
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    {[...Array(5)].map((_, index) => (
                                        <View style={{ marginLeft: 3 }}>

                                            <AppIcon
                                                name="star"
                                                size={10}
                                                color={colors.grey2}
                                                library="Fontisto"

                                            />
                                        </View>
                                    ))}
                                </View>

                                <Text style={[styles.category,{marginTop:5}]}>{item.orders} orders</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.category}>
                                    {item.category.length > 16 ? `${item.category.substring(0, 12)}...` : item.category}
                                </Text>
                                <Text style={styles.category}>
                                    {item.languages.length > 16 ? `${item.languages.substring(0, 12)}...` : item.languages}
                                </Text>

                                <Text style={styles.experience}>Exp.{item.experience}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>navigation.navigate(ScreenName.chat)} style={{ borderWidth: 1, borderColor: "#FFC107", paddingHorizontal: 25, paddingVertical: 5, borderRadius: 8 }} >
                                <Text style={styles.chat}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity style={styles.fab}>
                <AppIcon
                    name="filter"
                    size={23}
                    color={colors.white}
                    library="Feather"

                />
            </TouchableOpacity>
        </View>
    );
};

export default Astrologers;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.lightgrey },
    header: {
        flexDirection: 'row',
        backgroundColor: '#6A1B9A',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    card: {
        flexDirection: 'row',
        // padding: 25,
        paddingHorizontal:20,
        paddingTop:5,
        paddingBottom:20,


        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth:2,
        borderColor:colors.grey4,
        // elevation: 3,
        alignItems: 'center',
    },
    profileImage: { width: 50, height: 50, borderRadius: 25 },
    infoContainer: { flex: 1, marginLeft: 10 },
    name: { fontSize: 16, fontWeight: 'bold', color: colors.black },
    category: { fontSize: 12, fontWeight: '400', color: colors.grey6 },
    location: { color: 'gray' },
    experience: { color: colors.red, fontWeight: '600', fontSize: 14 },
    chat: { color: colors.red, fontWeight: '500', fontSize: 14 },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: colors.red,
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
});
