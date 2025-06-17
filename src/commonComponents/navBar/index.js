import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { navbarOpenState } from "../../redux/slices/sideNavBar";
import { colors } from "../../utils/colors";
import { Images } from "../../utils/images";
import { NavBarData } from "../../utils/Datas/NavBar";
import { ScreenName } from "../../utils/screenName";
import { useNavigation } from "@react-navigation/native";
import AppIcon from "../Icons/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../redux/slices/authStateSice";
import { useGetUserQuery } from "../../redux/services/auth/authSlice";


const CustomDrawerContent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  const {
    data: profileData,
    refetch: profileRefetch,
    status: profilestatus
  } = useGetUserQuery(userId);

  useEffect(() => {
    profileRefetch()
    console.log(profileData, "datassss");

  }, [profileData])

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    dispatch(logout());
    dispatch(navbarOpenState(false));
    // Optionally navigate to login screen after logout
    navigation.navigate(ScreenName.login);
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tantra Talk</Text>
      </View>

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => {
          navigation.navigate(ScreenName.profile);
          // Close drawer after navigation
          dispatch(navbarOpenState(false));
        }}
      >
        <Image source={Images.userimg} style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileText}>{profileData?.user?.name}</Text>
          <Text style={styles.profileText}>{profileData?.user?.contact}</Text>
        </View>
      </TouchableOpacity>

      {/* Navigation List */}
      <View style={styles.navList}>
        {NavBarData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItemContainer}
            onPress={() => {
              if (item.id === 5) {
                handleLogout();

              } else {
                navigation.navigate(item.navigation);
                // Close the drawer after navigation
                dispatch(navbarOpenState(false));
              }
            }}
          >
            <View style={styles.navItem}>
              {item.id === 5 ? (
                <AppIcon
                  name="logout"
                  size={24}
                  color={colors.red}
                  library="AntDesign"
                />
              ) : (
                <Image source={item.img} style={styles.navIcon} />
              )}
              <Text style={styles.navText}>{item.name}</Text>
            </View>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image source={Images.sidemenubg} style={styles.backgroundImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    color: colors.red,
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    marginTop: 45,
    backgroundColor: colors.lightgrey,
    padding: 10,
    alignItems: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  profileTextContainer: {
    marginLeft: 30,
    justifyContent: "center",
  },
  profileText: {
    fontSize: 12,
    color: colors.black0,
  },
  navList: {
    marginTop: 20,
  },
  navItemContainer: {
    marginLeft: 10,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  navIcon: {
    height: 30,
    width: 30,
  },
  navText: {
    margin: 8,
    color: colors.black,
  },
  separator: {
    borderBottomColor: colors.grey1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%",
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    width: "100%",
    height: "80%",
  },
});

export default CustomDrawerContent;
