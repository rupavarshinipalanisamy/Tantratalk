import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import { Images } from "../utils/images";
import { colors } from "../utils/colors";
import { CommonHeader } from "../commonComponents/components";
import axios from "axios";
import { config } from "../utils/config";
import { ScreenName } from "../utils/screenName";
import { useAddCartMutation, useUpdateCartMutation } from "../redux/services/api/backendapi";
import { useSnackbar } from "../commonComponents/Snackbar";
import { getUserId } from "../utils/helper";

const ProductDescription = ({ route, navigation }) => {
    const { productId } = route.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(productId, "productidsss");
        const fetchProducts = async () => {
            try {
                console.log("beforetyr");
                const response = await axios.get(`${config.BACKEND_BASE_URL}/products-details/${productId}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [productId]);

    const [addCart] = useAddCartMutation();


    const { showSnackbar } = useSnackbar();
    const addtoCart = async () => {
        console.log("addedtocart");
        const userId = await getUserId();
        console.log('====================================');
        console.log(userId);
        console.log('====================================');
        const payload = {
            userId: userId,
            productId: productId,
            quantity: 1
        }
        try {
            console.log("entertry");
            const response = await addCart(JSON.stringify(payload)).unwrap();
            console.log(response);
            showSnackbar({
                text: 'Item added to cart!',
                status: 'success',
                time: 20000,
            });
            navigation.navigate(ScreenName.cartScreen)
        } catch (error) {
            showSnackbar({
                text: 'Something wen wrong !',
                status: 'error',
                time: 20000,
            });
            console.error('Failed to add item', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                {/* Header */}
                <CommonHeader name={"description"} showBackButton={true} />
                <Image
                    source={{ uri: products.imageUrl }} // Replace with actual image
                    style={styles.productImage}
                />
                {/* Product Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{products.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color="#FFD700" />
                        <Text style={styles.rating}>4.4</Text>
                        <Text style={[styles.reviewCount, { marginLeft: 5 }]}>(230 Reviews)</Text>
                    </View>
                    <Text style={styles.productName}>₹ {products.price}</Text>
                    <Text style={styles.reviewCount}>Inclu taxes</Text>
                    {/* Action Buttons */}

                    <TouchableOpacity style={styles.addcartBtn} onPress={() => addtoCart()}>
                        <Text style={styles.followText}>Add to cart</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.detailstxt}>Details</Text>
                        <Text>{products.description}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomTab}>
                <View>
                    <Text>Price</Text>
                    <Text>₹ {products.price}</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    detailstxt: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.black
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    productImage: {
        width: "100%",
        height: 300,
    },
    detailsContainer: {
        padding: 15,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        // elevation: 3,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    rating: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
    },
    reviewCount: {
        fontSize: 12,
        color: "#555",

    },
    description: {
        fontSize: 14,
        color: "#777",
        marginTop: 5,
    },
    addcartBtn: {
        backgroundColor: colors.red,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "30%",
        marginTop: 10
    },

    followButton: {
        backgroundColor: colors.red,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "28%",
        marginTop: 10
    },
    followText: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.white
    },
    addToCartButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    addToCartText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    bottomTab:
        { backgroundColor: colors.white, flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center", borderTopWidth: 1, borderColor: colors.grey3 }

});

export default ProductDescription;
