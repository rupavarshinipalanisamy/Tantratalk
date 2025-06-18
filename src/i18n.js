import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import ta from './locales/ta.json'; // Tamil

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      const savedLang = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (savedLang) {
        callback(savedLang); // use stored language
      } else {
        callback('en'); // fallback
      }
    } catch (error) {
      console.log('Error reading language from AsyncStorage', error);
      callback('en'); // fallback
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error storing language in AsyncStorage', error);
    }
  },
};

const resources = {
  en: {
    translation: en,
  },
  ta: {
    translation: ta,
  },
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
