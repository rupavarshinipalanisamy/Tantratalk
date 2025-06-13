// src/helpers/storageHelpers.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        return userId;
    } catch (error) {
        console.error("Error retrieving userId:", error);
        return null;
    }
};

export const getUserToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};
