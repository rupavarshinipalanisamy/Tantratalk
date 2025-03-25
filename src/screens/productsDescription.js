import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import { Images } from "../utils/images";
import { colors } from "../utils/colors";
import { CommonHeader } from "../commonComponents/components";

const ProductDescription = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <CommonHeader name={"description"} showBackButton={true} />
            <Image
                source={Images.bracelet1} // Replace with actual image
                style={styles.productImage}
            />

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.productName}>Bracelet for peace</Text>
                <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>4.4</Text>
                    <Text style={[styles.reviewCount, { marginLeft: 5 }]}>(230 Reviews)</Text>

                </View>
                <Text style={styles.productName}>$ 230</Text>
                <Text style={styles.reviewCount}>Inclu taxes</Text>
                {/* Action Buttons */}

                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Buy Now</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.detailstxt}>Details</Text>
                    <Text>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Text>
                </View>
            </View>
            <View style={{ backgroundColor: colors.white, flexDirection: "row", justifyContent: "space-between", padding: 15, alignItems: "center",borderTopWidth:1,borderColor:colors.grey3}}>
                <View>
                    <Text>Price</Text>
                    <Text>$ 567</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Buy Now</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
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

    followButton: {
        backgroundColor: colors.red,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "28%",
        marginTop: 10
    },
    followText: {
        fontSize: 14,
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
});

export default ProductDescription;
