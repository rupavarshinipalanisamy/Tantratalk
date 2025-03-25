import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { CommonHeader } from '../commonComponents/components';
import { commonstyles } from '../commonComponents/commonStyles';
import { InputField } from '../commonComponents/inputField';
import { useFormik } from 'formik';
import { Button } from '../commonComponents/Button';
import RazorpayCheckout from 'react-native-razorpay';
import { config } from '../utils/config';

const walletAmounts = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

const WalletScreen = () => {
    const [walletBalance, setWalletBalance] = useState(0);

    // useEffect(() => {
    //     fetchWalletBalance();
    // }, []);

    // const fetchWalletBalance = async () => {
    //     try {
    //         const response = await fetch(`${config.BACKEND_BASE_URL}/razorpay/wallet-balance`);
    //         const data = await response.json();
    //         if (data.success) {
    //             setWalletBalance(data.balance);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching wallet balance:', error);
    //     }
    // };

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        onSubmit: () => handlePayment(),
    });

    const handlePayment = async () => {
        const amountInPaise = Number(formik.values.amount) * 100; // Convert ₹ to paise

        if (!amountInPaise || amountInPaise < 10000) {
            alert('Minimum wallet recharge is ₹100');
            return;
        }

        try {
            formik.setFieldValue('amount', '');
            const orderResponse = await fetch(`${config.BACKEND_BASE_URL}/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amountInPaise }),
            });

            const orderData = await orderResponse.json();

            if (!orderData || !orderData.id) {
                alert('Failed to create order. Please try again.');
                return;
            }

            // Step 2: Open Razorpay Checkout
            const options = {
                description: 'Wallet Recharge',
                currency: 'INR',
                key: 'rzp_test_vjQqkVyI66lvzk',
                amount: amountInPaise,
                name: 'TantraTalk',
                order_id: orderData.order_id, // Received from backend
                prefill: { email: 'user@example.com', contact: '9876543210', name: 'User Name' },
                theme: { color: colors.red },
            };

            RazorpayCheckout.open(options)
                .then(async (data) => {
                    formik.setFieldValue('amount', '');

                    const verifyResponse = await fetch('http://192.168.1.12:5000/apiV1/backend/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: data.razorpay_order_id,
                            razorpay_payment_id: data.razorpay_payment_id,
                            razorpay_signature: data.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyResponse.json();
                    if (verifyData.success) {
                        alert('Payment verified successfully! Wallet recharged.');
                        fetchWalletBalance(); // Update balance after successful payment
                    } else {
                        alert('Payment verification failed.');
                    }
                })
                .catch((error) => {
                    console.log('Payment Failed:', error);
                    alert('Payment failed. Please try again.');
                });
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <View style={commonstyles.screencontainer}>
            <CommonHeader name="Wallet" />
            <View style={styles.container}>
                {/* Wallet Balance */}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Wallet Balance</Text>
                    <Text style={styles.balanceAmount}>₹ {walletBalance}</Text>
                </View>
                {/* Recharge Section */}
                <InputField
                    isLabel={true}
                    label="Enter Amount"
                    fullWidth={true}
                    borderColor="#00b1f3"
                    type="numeric"
                    value={formik.values.amount}
                    onChange={(value) => formik.setFieldValue('amount', value)}
                />
                <Text style={styles.minAmount}>* Minimum wallet amount is ₹100</Text>
                {/* Choose Amount */}
                <Text style={styles.orChooseAmount}>Or Choose Amount</Text>
                <FlatList
                    data={walletAmounts}
                    numColumns={3}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.amountCard}
                            onPress={() => formik.setFieldValue('amount', item.toString())}
                        >
                            <Text style={styles.amountText}>₹ {item}</Text>
                            <View style={styles.choosePlanButton}>
                                <Text style={styles.choosePlanText}>Choose Plan</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Button title="Recharge Now" onPress={() => formik.handleSubmit()} fullWidth={true} style={{ marginTop: 50 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    balanceContainer: { backgroundColor: colors.red, padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
    balanceLabel: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
    balanceAmount: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    minAmount: { fontSize: 12, color: 'red', marginBottom: 10 },
    orChooseAmount: { fontSize: 14, textAlign: 'center', fontWeight: 'bold', marginVertical: 10 },
    amountCard: { flex: 1, backgroundColor: '#fff', borderRadius: 10, paddingTop: 20, alignItems: 'center', margin: 5, borderWidth: 1, borderColor: '#ddd' },
    amountText: { fontSize: 16, fontWeight: '400', padding: 15, color: colors.black },
    choosePlanButton: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.red,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    choosePlanText: { color: '#fff', fontSize: 12, padding: 10 },
});

export default WalletScreen;
