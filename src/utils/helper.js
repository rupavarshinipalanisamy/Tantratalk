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

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
