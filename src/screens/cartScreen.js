import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    Platform
} from "react-native";
import { CommonHeader, LineTextInput } from "../commonComponents/components";
import { colors } from "../utils/colors";
import { ScreenName } from "../utils/screenName";
import { useAddAddressMutation, useGetCartItemQuery, useGetUserAddressQuery, usePaymentInitiateMutation, usePaymentVerifyMutation, useSelectAddressMutation, useUpdateCartMutation } from "../redux/services/api/backendapi";
import { useFormik } from "formik";
import AppIcon from "../commonComponents/Icons/Icons";
import RazorpayCheckout from 'react-native-razorpay';
import { getUserId } from "../utils/helper";
import { useTranslation } from "react-i18next";


const CartScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [tempAddress, setTempAddress] = useState('');
    const [AddressChooseModal, setAddressChooseModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [userId, setUserId] = useState(null);
    const { t } = useTranslation()

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);


    const formik = useFormik({
        initialValues: {
            userId: "",
            name: "",
            phone: "",
            city: "",
            state: "",
            pincode: "",
            street: "",
            buildingname: "",
            landmark: "",
            isDefault: true
        },
        // validationSchema: password,
        onSubmit: async (values) => {
            await handleSaveaddress(values);
        },
    });
    const [addAddress] = useAddAddressMutation();
    const [updateCart] = useUpdateCartMutation();
    const [selectAddress] = useSelectAddressMutation();
    const [initiatePayment] = usePaymentInitiateMutation();
    const [paymentVerify] = usePaymentVerifyMutation();

    const {
        data,
        refetch,
        isError,
        error,
        isLoading,
        isFetching,
        status
    } = useGetCartItemQuery({ userId });

    useEffect(() => {
        refetch()
        console.log(data, "datassss");

    }, [data])

    const {
        data: addressData,
        refetch: addressRefetch,
        isError: addressisError,
        error: addressError,
        isLoading: addressisLoading,
        isFetching: addressisfecting,
        status: addressStatus
    } = useGetUserAddressQuery(userId);
    console.log(addressData?.addresses, "addressDatas");


    useEffect(() => {
        if (addressData?.addresses?.length > 0) {
            const selected = addressData.addresses.find(addr => addr.isSelected);
            if (selected) {
                setSelectedAddress(selected);
            } else if (!selectedAddressId) {
                const firstAddress = addressData.addresses[0];
                setSelectedAddress(firstAddress);
            }
        }
    }, [addressData]);

    const updateQnty = async (productId, qnty) => {
        console.log(productId, qnty, "yessss");

        console.log("addedtocart");
        const payload = {
            userId: userId,
            productId: productId,
            change: qnty
        }
        try {
            console.log("entertry1");
            const response = await updateCart(JSON.stringify(payload)).unwrap();
            console.log(response, "resupdateQnty");
            refetch();
            showSnackbar({
                text: 'Quantity updated',
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

    const displayAddress = async (addressId) => {
        console.log(addressId, "addressId");
        console.log("addedtocart");
        const payload = {
            userId: userId,
            selectedAddressId: addressId
        }
        try {
            console.log("entertry1");
            const response = await selectAddress(JSON.stringify(payload)).unwrap();
            console.log(response, "resupdateQnty");
            addressRefetch();
        } catch (error) {
            console.error('Failed to add item', error);
        }
    }
    const proceedPayment = async () => {
        const userId = await getUserId();
        try {
            const shippingAddress = selectedAddress?.formattedAddress;
            const paymentMethod = "Razorpay";
            const items = data?.items;
            const subtotal = data?.subtotal;
            const tax = subtotal * 0.1;
            const totalAmount = subtotal + tax + 50;
            console.log({
                userId,
                items,
                shippingAddress,
                paymentMethod,
                subtotal,
                tax,
                totalAmount,
            }, "chceking");

            // Step 1: Call your backend to create Razorpay order and store in DB
            const response = await initiatePayment({
                userId,
                items,
                shippingAddress,
                paymentMethod,
                subtotal,
                tax,
                totalAmount,
            }).unwrap();

            const { orderId, amount, currency } = response;

            // Step 2: Open Razorpay Checkout
            const options = {
                description: 'Ecommerce Transaction',
                image: 'https://yourlogo.com/logo.png',
                currency,
                key: 'rzp_test_vjQqkVyI66lvzk',
                amount,
                name: 'Tantratalk',
                order_id: orderId,
                prefill: {
                    email: 'user@example.com',
                    contact: '9876543210',
                    name: 'John Doe',
                },
                theme: { color: colors.red },
            };

            RazorpayCheckout.open(options)
                .then(async (paymentData) => {
                    // Step 3: Verify payment with your backend
                    console.log({
                        razorpay_order_id: orderId,
                        razorpay_payment_id: paymentData.razorpay_payment_id,
                        razorpay_signature: paymentData.razorpay_signature,
                    }, "checkkk");

                    const verifyRes = await paymentVerify({
                        razorpay_order_id: orderId,
                        razorpay_payment_id: paymentData.razorpay_payment_id,
                        razorpay_signature: paymentData.razorpay_signature,
                    })
                    console.log(verifyRes, "pamentsignature");

                    if (verifyRes.data.success) {
                        alert("Payment Verified and Order Confirmed!");
                    } else {
                        alert("Payment verification failed");
                    }
                })
                .catch((error) => {
                    console.error("Payment Failed:", error);
                    alert("Payment Failed");
                });

        } catch (err) {
            console.error("Payment initiation failed:", err);
            alert("Something went wrong during payment initiation");
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.cartItem, { flexDirection: "row", borderRadius: 8 }]}>
            <Image source={{ uri: item?.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.price}>₹{item?.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQnty(item?.productId, -1)}>
                        <Text style={styles.qtyBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item?.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQnty(item?.productId, 1)}>
                        <Text style={styles.qtyBtn}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    const handleSaveaddress = async (values) => {
        const payload = {
            userId: userId,
            name: values.name,
            phone: values.phone,
            city: values.city,
            state: values.state,
            pincode: values.pincode,
            street: values.street,
            buildingname: values.buildingname,
            landmark: values.landmark,
            isDefault: true
        }

        try {
            console.log("entertry");

            const response = await addAddress(JSON.stringify(payload)).unwrap();
            console.log(response, "responsess");

        } catch (error) {
            console.error('Login Failed:', error);
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader name="Cart" showBackButton={true} />
            <View style={styles.addressContainer}>
                <View>
                    <Text style={styles.addressLabel}>{t("deliveryto")}</Text>
                    {selectedAddress ? (
                        <Text style={styles.addressText}>
                            {selectedAddress.formattedAddress.length > 20
                                ? selectedAddress.formattedAddress.slice(0, 42) + '....'
                                : selectedAddress.formattedAddress}
                        </Text>
                    ) : (
                        <Text style={styles.addressText}>{t("noaddressset")}</Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (addressData?.addresses.length > 0) {
                            setAddressChooseModal(true);
                        } else {
                            setModalVisible(true);
                        }
                    }}
                >
                    <Text style={styles.editAddressText}>{addressData?.addresses.length > 0 ? t('chooseaddress') : t('addaddress')}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data?.items}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    ListEmptyComponent={() => (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <Text>{t("noitemswereaddedincart")}</Text>
                        </View>
                    )}
                />
            </View>

            {data?.items?.length > 0 && (
                <View>
                    <View style={styles.cartItem}>
                        <Text style={[styles.label, { marginBottom: 5 }]}>{t("pricedetails")}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                            <Text style={styles.totaltext}>{t("subtotal")}:</Text>
                            <Text style={[styles.totalamount, { fontWeight: "400" }]}>{data?.subtotal}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                            <Text style={styles.totaltext}>{t("deliveryfee")}:</Text>
                            <Text style={[styles.totalamount, { fontWeight: "400" }]}>{data?.deliveryCharge}</Text>
                        </View>
                        <View style={{ borderWidth: 0.3, borderColor: colors.grey4, marginTop: 5, marginBottom: 5 }}></View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                            <Text style={styles.totaltext}>{t("totalamount")}:</Text>
                            <Text style={[styles.totalamount, { fontWeight: "600" }]}>{data?.totalAmount}</Text>
                        </View>
                    </View>
                </View>
            )}

            <View style={styles.bottomTab}>
                <TouchableOpacity
                    style={[styles.checkoutButton, data?.items?.length === 0 && styles.disabledButton]}
                    onPress={() => proceedPayment()}
                    disabled={data?.items?.length === 0}  // disables button when no items
                >
                    <Text style={styles.checkoutText}>{t("proceedtopayment")}</Text>
                </TouchableOpacity>

            </View>
            <Modal
                transparent
                animationType="slide"
                visible={AddressChooseModal}
                onRequestClose={() => setAddressChooseModal(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 2 }}
                                onPress={() => {
                                    setAddressChooseModal(false);
                                }}
                            >
                                <AppIcon
                                    name="closecircleo"
                                    size={22}
                                    color={colors.grey6}
                                    library="AntDesign"

                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginBottom: 5 }}>{t("chooseadeliveryaddress")}</Text>

                            {addressData?.addresses?.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    onPress={() => {
                                        setSelectedAddressId(item._id)
                                        displayAddress(item?._id)
                                    }}
                                    style={{
                                        marginTop: 10,
                                        padding: 10,
                                        borderWidth: selectedAddress?._id === item._id ? 1 : 1,
                                        borderColor: selectedAddress?._id === item._id ? colors.red : '#ccc',
                                        borderRadius: 8,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Text style={styles.nameTxt}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.addressText}>
                                        {item.buildingname}, {item.street}{"\n"}
                                        {item.landmark}{"\n"}
                                        {item.city} - {item.pincode}
                                    </Text>

                                </TouchableOpacity>
                            ))}


                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal
                transparent
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                            >

                                <Text style={styles.modalTitle}>{t("enterdeliveryaddress")}</Text>
                                <ScrollView
                                    style={{ flex: 1 }}
                                    contentContainerStyle={styles.scrollContent}
                                    keyboardShouldPersistTaps="handled"
                                >

                                    <View>
                                        <LineTextInput
                                            isLabel={true}
                                            label={t("name")}
                                            onBlur={formik.handleBlur('name')}
                                            value={formik.values.name}
                                            onChange={(value) => formik.setFieldValue('name', value)}
                                        />
                                    </View>

                                    <View style={{ marginTop: 25 }}>
                                        <LineTextInput
                                            isLabel={true}
                                            label={t("phonenumber")}
                                            onBlur={formik.handleBlur('phone')}
                                            value={formik.values.phone}
                                            onChange={(value) => formik.setFieldValue('phone', value)}
                                        />
                                    </View>

                                    <View style={{ marginTop: 25 }}>
                                        <LineTextInput
                                            isLabel={true}
                                            label={t("city")}
                                            onBlur={formik.handleBlur('city')}
                                            value={formik.values.city}
                                            onChange={(value) => formik.setFieldValue('city', value)}
                                        />
                                    </View>
                                    <View style={{ marginTop: 25 }}>
                                        <LineTextInput
                                            isLabel={true}
                                            label={t("state")}
                                            onBlur={formik.handleBlur('state')}
                                            value={formik.values.state}
                                            onChange={(value) => formik.setFieldValue('state', value)}
                                        />
                                    </View>
                                    <View style={{ marginTop: 25 }}>
                                        <LineTextInput
                                            isLabel={true}
                                            label={t("pincode")}
                                            onBlur={formik.handleBlur('pincode')}
                                            value={formik.values.pincode}
                                            onChange={(value) => formik.setFieldValue('pincode', value)}
                                        />
                                    </View>
                                    <View style={{ marginTop: 25 }}>
                                        <LineTextInput
                                            label={t("street/area/locality")}
                                            isLabel={true}
                                            onBlur={formik.handleBlur('street')}
                                            value={formik.values.street}
                                            onChange={(value) => formik.setFieldValue('street', value)}
                                        />
                                    </View>
                                    <View style={{ marginTop: 25 }}>
                                        <LineTextInput
                                            label={t("flatno/buildingname")}
                                            isLabel={true}
                                            onBlur={formik.handleBlur('buildingname')}
                                            value={formik.values.buildingname}
                                            onChange={(value) => formik.setFieldValue('buildingname', value)}
                                        />
                                    </View>
                                    <View style={{ marginTop: 25, marginBottom: 15 }}>
                                        <LineTextInput
                                            label={t("landmark(optional)")}
                                            isLabel={true}
                                            onBlur={formik.handleBlur('landmark')}
                                            value={formik.values.landmark}
                                            onChange={(value) => formik.setFieldValue('landmark', value)}
                                        />
                                    </View>
                                </ScrollView>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Text style={styles.cancelButton}>{t("cancel")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                            formik.handleSubmit()
                                        }}
                                    >
                                        <Text style={styles.saveButton}>{t("save")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    cartItem: {
        padding: 15,
        width: "95%",
        backgroundColor: colors.white,
        marginTop: 10,
        paddingLeft: 30,
        alignSelf: 'center',
        elevation: 3, // Shadow for Android
        shadowColor: '#fffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.black,
    },
    nameTxt: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "500"
    },
    price: {
        fontSize: 14,
        color: colors.grey1,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    qtyBtn: {
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 10,
        color: colors.red,
    },
    qty: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    bottomTab: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderColor: colors.grey3,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
    },
    checkoutButton: {
        backgroundColor: colors.red,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    checkoutText: {
        color: "#fff",
        fontWeight: "bold",
    },

    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 15,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    addressLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.black,
    },
    addressText: {
        fontSize: 13,
        color: colors.black,
        marginTop: 3,
    },
    addressButton: {
        backgroundColor: colors.red,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    addressButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    editAddressText: {
        color: 'blue',
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        height: '75%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    scrollContent: {
        paddingBottom: 30,
        flexGrow: 1
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    saveButton: {
        color: 'green',
        fontWeight: 'bold',
    },

    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    totaltext: {
        fontSize: 14,
        color: colors.grey2,
    },
    totalamount: {
        fontSize: 14,
        color: colors.black,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },

});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
//   Platform,
//   Button,
// } from 'react-native';

// const CartScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.screen}>
//       <Button title="Open Modal" onPress={() => setModalVisible(true)} />

//   <Modal
//     transparent
//     animationType="slide"
//     visible={modalVisible}
//     onRequestClose={() => setModalVisible(false)}
//   >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//   <KeyboardAvoidingView
//     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     style={{ flex: 1 }}
//     keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//   >
//                 <Text style={styles.modalTitle}>Enter Delivery Info</Text>

// <ScrollView
//   style={{ flex: 1 }}
//   contentContainerStyle={styles.scrollContent}
//   keyboardShouldPersistTaps="handled"
// >
//                   {Array.from({ length: 10 }).map((_, index) => (
//                     <TextInput
//                       key={index}
//                       placeholder={`Input ${index + 1}`}
//                       style={styles.textInput}
//                     />
//                   ))}
//                 </ScrollView>

//                 <TouchableOpacity
//                   onPress={() => setModalVisible(false)}
//                   style={styles.closeButton}
//                 >
//                   <Text style={styles.closeText}>Close</Text>
//                 </TouchableOpacity>
//               </KeyboardAvoidingView>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     height: '75%',
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   scrollContent: {
//     paddingBottom: 30,
//   },
//   textInput: {
//     height: 50,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     marginBottom: 15,
//     borderRadius: 6,
//     paddingHorizontal: 10,
//   },
//   closeButton: {
//     alignSelf: 'center',
//     padding: 10,
//   },
//   closeText: {
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default CartScreen;





