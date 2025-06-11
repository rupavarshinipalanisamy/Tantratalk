import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../utils/colors";
import { FeaturesData } from "../../utils/Datas/Features";
import { AstrologersData } from "../../utils/Datas/Astrologers";
import { Images } from "../../utils/images";
import { Button, SmallBtn } from "../../commonComponents/Button";
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from "../../commonComponents/Icons/Icons";
import { navbarOpenState } from "../../redux/slices/sideNavBar";
import { commonstyles } from "../../commonComponents/commonStyles";
import { BottomNavigator } from "../../commonComponents/components";
import BottomNavigationBar from "../../commonComponents/bottomNavigator";
import { ScreenName } from "../../utils/screenName";
import { RemediesData } from "../../utils/Datas/Remedies";
import { PoojasData } from "../../utils/Datas/poojasData";
import { styles } from "../HomeScreen/style"
import PopupModal from "../../commonComponents/GeneratorPopup";
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    const isOpen = useSelector((state) => state.sidenavbar.isOpen);
    const dispatch = useDispatch();
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
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate(ScreenName.cartScreen)}>
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
const Features = ({ navigation }) => {
    return (
        <ScrollView style={styles.featuresContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            {FeaturesData.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={styles.featureItem} onPress={() => navigation.navigate(item.navigation)}>
                        <View style={styles.featuresCard}>
                            <Image source={item?.img} style={{ height: 30, width: item.width }} />
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
                {RemediesData.map((item, index) => (
                    <View key={index} style={styles.remediesItem}>
                        <View style={styles.RemediesCard}>
                            <Image source={item?.img}
                                style={styles.remedyImage}
                                resizeMode="cover" />
                            <View style={styles.remedytxtContainer}>
                                <Text style={styles.remedyName}>{item.name}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};
//old design
// const Poojas = () => {
//     return (
//         <ScrollView contentContainerStyle={styles.poojasContainer}>
//             {PoojasData.map((item, index) => (
//                 <View
//                     key={index}
//                     style={[
//                         styles.rowContainer,
//                         index % 2 === 0 ? styles.rowLeft : styles.rowRight, // Alternating layout
//                     ]}
//                 >
//                     {/* "See All" Text */}
//                     <Text style={styles.seeAllText}>See All</Text>

//                     {/* Pooja Card */}
//                     <View style={styles.poojasCard}>
//                         <Image source={item?.img} style={styles.poojaImage} resizeMode="cover" />
//                         <Text style={styles.poojaTitle}>{item.name}</Text>
//                     </View>
//                 </View>
//             ))}
//         </ScrollView>
//     );
// };


const Poojas = () => {
    return (
        // <ScrollView contentContainerStyle={styles.poojasContainer}>
             <View >
            <ScrollView style={[styles.featuresContainer, { backgroundColor: "transparent" }]} horizontal={true} showsHorizontalScrollIndicator={false}>
                {PoojasData.map((item, index) => {
                    return (
                        <View key={index} style={styles.featureItem}>
                            <View style={styles.AstrologerCard}>
                                <Image source={item?.img} style={{ height: 50, width: 50, borderRadius: 50, marginTop: 15 }} />
                                <View style={{ marginTop: 5 }}>
                                    <Text style={styles.astrologerName}>{item.name}</Text>
                                    {/* <Text style={styles.chattxt}>Chat</Text> */}
                                </View>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
        // </ScrollView>
    );
};
const BookSlot = ({ navigation }) => {
    return (
        <View style={{ borderRadius: 8, overflow: "hidden", marginHorizontal: 15, marginTop: 10, marginBottom: 10 }}>
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
                    <SmallBtn title="Book slot" backgroundColor={colors.red} onPress={() => navigation.navigate(ScreenName.consultation)} />

                </View>
            </ImageBackground>
        </View>
    );
};
const Books = () => {
    return (
        <ScrollView contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 16,
        }}>
            <View style={styles.row}>
                <View style={styles.bookCard}>
                    <Image source={Images.tantraBooks} style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <Text style={styles.bookText}>Tantra Books</Text>
                </View>
                <View style={styles.bookCard}>
                    <Image source={Images.onlineclasses} style={{ height: 50, width: 50, borderRadius: 50 }} />

                    <Text style={styles.bookText}>online Classes</Text>
                </View>
            </View>
        </ScrollView>
    );
};
const TipsandArticles = () => {
    return (
        <ScrollView contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 16,
        }}>
            <View style={styles.row}>
                <View style={styles.tipsartCard}>
                    <Image source={Images.tantraBooks} style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <Text style={styles.tipsartCardtxt}>Tantra Tips</Text>
                </View>
                <View style={styles.tipsartCard}>
                    <Image source={Images.onlineclasses} style={{ height: 50, width: 50, borderRadius: 50 }} />

                    <Text style={styles.tipsartCardtxt}>Articles</Text>
                </View>
            </View>
        </ScrollView>
    );
};
const HomeScreen = ({ navigation }) => {
    const [currentTab, setCurrentTab] = useState('list');

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={commonstyles.screencontainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}>
                <Header />
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => setModalVisible(true)}
                >
                    <AppIcon
                        name="timer-outline"
                        size={25}
                        color={colors.black}
                        library="Ionicons"
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <View>
                        <Text style={styles.headertxt}>Features</Text>

                    </View>
                    <Features navigation={navigation} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <BookSlot navigation={navigation} />
                </View>
                {/* <View style={{ marginTop: 10 }}>
                    <View style={styles.headerConatiner}>
                        <Text style={styles.headertxt}>Astrologers</Text>
                        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate(ScreenName.Astrologers)}>
                            <Text style={styles.viewalltxt}>View all</Text>

                        </TouchableOpacity>
                    </View>
                    <Astrologers />
                </View> */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.headertxt}>Poojas</Text>
                    <Poojas />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.headertxt}>Books</Text>
                    <Books />
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.headerConatiner}>
                        <Text style={styles.headertxt}>Remedies</Text>
                        <TouchableOpacity style={{ marginRight: 15 }}>
                            <Text style={styles.viewalltxt}>View all</Text>

                        </TouchableOpacity>
                    </View>
                    <Remedies />
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.headerConatiner}>
                        <View style={[styles.line, { marginLeft: 5 }]} />
                        <Text style={[styles.headertxt, { textAlign: "center" }]}>Tips and Articles</Text>
                        <View style={[styles.line, { marginRight: 5 }]} />
                    </View>
                    <TipsandArticles />
                </View>
            </ScrollView>
            <PopupModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            <BottomNavigationBar />
        </View>

    );
};


export default HomeScreen;
