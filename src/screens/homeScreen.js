import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Icons
import { colors } from "../utils/colors";
import { FeaturesData } from "../utils/Datas/Features";
import { AstrologersData } from "../utils/Datas/Astrologers";
import { Images } from "../utils/images";
import { Button, SmallBtn } from "../commonComponents/Button";
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from "../commonComponents/Icons/Icons";
import { navbarOpenState } from "../redux/slices/sideNavBar";
import { commonstyles } from "../commonComponents/commonStyles";
import { BottomNavigator } from "../commonComponents/components";
import BottomNavigationBar from "../commonComponents/bottomNavigator";
import { ScreenName } from "../utils/screenName";
const Header = () => {
    const isOpen = useSelector((state) => state.sidenavbar.isOpen);
    const dispatch = useDispatch();
    const openModal = () => {
        console.log(isOpen, "before");
        dispatch(navbarOpenState(true))
        console.log(isOpen, "after");
    }
    return (
        <View style={styles.header}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {/* Left Drawer Icon & App Name */}
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => dispatch(navbarOpenState(true))}>
                        <Icon name="menu" size={26} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Tantra Talk</Text>
                </View>
                {/* Right Icons: Cart & Notifications */}
                <View style={styles.rightSection}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Icon name="cart-outline" size={18} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconContainer, { marginLeft: 15 }]}>
                        <Icon name="bell-outline" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBar />
        </View>

    );
};

const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <Icon name="magnify" size={20} color="#888" />
            <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#888" />
        </View>
    );
};
const { width, height } = Dimensions.get("window");
const Features = ({navigation}) => {
    return (
        <ScrollView style={styles.featuresContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            {FeaturesData.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.featureItem} onPress={()=>navigation.navigate(item.navigation)}>
                        <View style={styles.featuresCard}>
                            <Image source={item?.img} style={{ height: 30, width: 30 }} />
                        </View>
                        <View>
                            <Text style={styles.featureText}>{item.title1}</Text>
                            <Text style={styles.featureText}>{item.title2}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}

        </ScrollView>
    );
};
const Astrologers = () => {
    return (
        <View >
            <ScrollView style={[styles.featuresContainer, { backgroundColor: "transparent" }]} horizontal={true} showsHorizontalScrollIndicator={false}>
                {AstrologersData.map((item, index) => {
                    return (
                        <View key={index} style={styles.featureItem}>
                            <View style={styles.AstrologerCard}>
                                <Image source={item?.img} style={{ height: 50, width: 50, borderRadius: 50, marginTop: 15 }} />
                                <View style={{ marginTop: 5 }}>
                                    <Text style={styles.astrologerName}>{item.name}</Text>
                                    <Text style={styles.chattxt}>Chat</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>

    );
};
const Remedies = () => {
    return (
        <ScrollView contentContainerStyle={styles.remediesContainer}>
            <View style={styles.grid}>
                {AstrologersData.map((item, index) => (
                    <View key={index} style={styles.remediesItem}>
                        <View style={styles.RemediesCard}>
                            <Image source={item?.img} style={{height:80,width:80}} />
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.astrologerName}>{item.name}</Text>
                                <Text style={styles.chattxt}>Chat</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};
const BookSlot = ({navigation}) => {
    return (
        <View style={{ borderRadius: 8, overflow: "hidden", marginHorizontal: 15,marginTop:10,marginBottom:10 }}>
            <ImageBackground
                source={Images.slotbg}
                style={{ height: 200, width: "100%" }}
                resizeMode="cover"
            >
                <View style={{ marginTop: 20, paddingLeft: 10 }}>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", color: colors.red }}>1 on 1</Text>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", color: colors.red }}>sessions</Text>
                    <Text style={{ color: "white", fontSize: 10, marginTop: 8 }}>
                        Talk with our Expert to {"\n"}clarify your astrologers{"\n"}doubt
                    </Text>
                </View>
                <View style={{ width: "30%", paddingLeft: 8, marginTop: 10 }}>
                    <SmallBtn title="Book slot" backgroundColor={colors.red} onPress={()=>navigation.navigate(ScreenName.consultation)}/>

                </View>
            </ImageBackground>
        </View>
    );
};

const HomeScreen = ({navigation}) => {
    const [currentTab, setCurrentTab] = useState('list'); // Initialize with 'list' or your default tab

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <View style={commonstyles.screencontainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.headertxt}>Features</Text>
                    <Features navigation={navigation}/>
                </View>
                <View style={{ marginTop: 10}}>
                    <BookSlot navigation={navigation} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.headertxt}>Astrologers</Text>
                    <Astrologers />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.headertxt}>Remedies</Text>
                    <Remedies />
                </View>
            </ScrollView>
            <BottomNavigationBar />
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    headertxt: {
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 20,
        color: colors.black
    },
    header: {
        backgroundColor: colors.red,
        height: height * 0.2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    leftSection: {
        flexDirection: "row",
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },
    rightSection: {
        flexDirection: "row",
    },
    iconSpacing: {
        marginLeft: 15,
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignItems: "center", justifyContent: "center"
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 35,
        paddingVertical: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        elevation: 2,
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    featuresContainer: {
        flexDirection: "row",
        marginBottom:5
    },
    featureItem: {
        alignItems: "center",
        marginHorizontal: 8,
        // backgroundColor:"transparent"
    },
    featuresCard: {
        height: 70,
        width: 70,
        elevation: 5,
        borderRadius: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    AstrologerCard: {
        height: 140,
        width: 110,
        borderRadius: 8,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 5,
        elevation: 3, // Shadow for Android
        shadowColor: '#fffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // borderWidth: 2, // Debugging border
        // borderColor: "blue", // Debugging color
    },

    RemediesCard: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding:20,
        elevation: 3, // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: '94%',
        margin: 5
    },
    astrologerName: {
        color: colors?.red,
        fontSize: 14,
        fontWeight: "500"
    },
    featureText: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "400",
        marginLeft: 5,
        color:colors.grey2
    },
    chattxt: {
        color: colors?.black1,
        fontSize: 10,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 5

    },
    remediesContainer: {
        paddingVertical: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-around",
    },
    remediesItem: {
        width: '48%',
        marginBottom: 10,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: 15,
    },
    modalOverlay: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)", // Dim background
    },
    overlay: {
        flex: 1, // Click to close
    },
    modalContent: {
        width: "70%",
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: -2, height: 0 },
        elevation: 5,
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    modalText: {
        marginTop: 20,
        fontSize: 18,
    },

});

export default HomeScreen;
