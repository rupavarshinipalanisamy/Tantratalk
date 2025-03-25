import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { CommonHeader } from "../commonComponents/components";
import { Images } from "../utils/images";
import { ScreenName } from "../utils/screenName";

const divineProducts = [
    { id: 1, name: "Bracelet", image: Images.bracelet1, price: 499, oldPrice: 599 },
    { id: 2, name: "Crystal Shree Yantra", image: Images.bracelet2, price: 899, oldPrice: 999 },
    { id: 3, name: "Tulsi Kanthi Mala", image: Images.capsules, price: 199, oldPrice: 299 },
    { id: 4, name: "Parad Shivling", image: Images.oil, price: 1299, oldPrice: 1499 },
    { id: 5, name: "Parad Shivling", image: Images.oil, price: 1299, oldPrice: 1499 },
    { id: 6, name: "Parad Shivling", image: Images.pendant, price: 1299, oldPrice: 1499 }, // Last item
];

const ProductCard = ({ item, isLastItem, navigation }) => (
    <View style={[styles.productContainer, isLastItem && styles.lastItem]}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(ScreenName.productDescription)}>
            <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
        </View>
    </View>
);

const ProductScreen = ({ navigation }) => {
    const isLastOdd = divineProducts.length % 2 !== 0;

    return (
        <View style={styles.container}>
            <CommonHeader name={"products"} />
            <View style={{ padding: 10 }}>
                <FlatList
                    data={divineProducts}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        const isLastItem = divineProducts.length % 2 !== 0 && index === divineProducts.length - 1;
                        return <ProductCard item={item} isLastItem={isLastItem} navigation={navigation} />;
                    }}
                />
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    productContainer: {
        flex: 1,
        margin: 8,
        alignItems: "center",
    },
    lastItem: {
        flexBasis: "48%", // Maintain same width as others
        alignSelf: "flex-start", // Align to the start
        marginRight: "auto", // Push it to the left
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        alignItems: "center",
        elevation: 3,
        width: 170,
        height: 180,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ff5733",
    },
    oldPrice: {
        fontSize: 12,
        color: "#aaa",
        textDecorationLine: "line-through",
        marginLeft: 5,
    },
});

export default ProductScreen;
