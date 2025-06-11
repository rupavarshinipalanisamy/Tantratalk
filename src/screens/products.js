import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { config } from "../utils/config";


const ProductCard = ({ item, isLastItem, navigation }) => (
    <View style={[styles.productContainer, isLastItem && styles.lastItem]}>
        <TouchableOpacity style={styles.card}   onPress={() => navigation.navigate(ScreenName.productDescription, { productId: item._id })}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.price}</Text>
             {item.oldPrice && (
                <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
            )}
        </View>
    </View>
);

const ProductScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${config.BACKEND_BASE_URL}/products`);
                console.log(response.data, "responsess");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            <CommonHeader name={"products"} />
            <View style={{ padding: 10 }}>
                <FlatList
                    data={products}
                    numColumns={2}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item, index }) => {
                        const isLastItem = products.length % 2 !== 0 && index === products.length - 1;
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
