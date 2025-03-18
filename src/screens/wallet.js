import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const walletAmounts = [
    100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000
];

const WalletScreen = () => {
    return (
        <View style={styles.container}>
            {/* Wallet Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Wallet</Text>
            </View>
            
            {/* Wallet Balance */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Wallet Balance</Text>
                <Text style={styles.balanceAmount}>₹ 0</Text>
            </View>

            {/* Recharge Section */}
            <Text style={styles.rechargeTitle}>Recharge</Text>
            <Text style={styles.enterAmount}>Enter Amount</Text>
            <TextInput style={styles.input} placeholder="200" keyboardType="numeric" />
            <Text style={styles.minAmount}>* Minimum wallet amount is ₹100</Text>
            
            {/* Choose Amount */}
            <Text style={styles.orChooseAmount}>Or Choose Amount</Text>
            
            <FlatList
                data={walletAmounts}
                numColumns={3}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <View style={styles.amountCard}>
                        <Text style={styles.amountText}>₹ {item}</Text>
                        <TouchableOpacity style={styles.choosePlanButton}>
                            <Text style={styles.choosePlanText}>Choose Plan</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 15 },
    header: { backgroundColor: '#f9a825', padding: 15 },
    headerText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    balanceContainer: { backgroundColor: '#f9a825', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
    balanceLabel: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
    balanceAmount: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    rechargeTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    enterAmount: { fontSize: 14, marginTop: 5 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 10, fontSize: 16, borderRadius: 8, marginVertical: 5 },
    minAmount: { fontSize: 12, color: 'red', marginBottom: 10 },
    orChooseAmount: { fontSize: 14, textAlign: 'center', fontWeight: 'bold', marginVertical: 10 },
    amountCard: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center', margin: 5, borderWidth: 1, borderColor: '#ddd' },
    amountText: { fontSize: 16, fontWeight: 'bold' },
    choosePlanButton: { backgroundColor: '#f9a825', padding: 5, borderRadius: 5, marginTop: 5 },
    choosePlanText: { color: '#fff', fontSize: 14 },
    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, borderTopWidth: 1, borderColor: '#ddd' },
    activeTab: { fontWeight: 'bold', color: '#f9a825' }
});

export default WalletScreen;