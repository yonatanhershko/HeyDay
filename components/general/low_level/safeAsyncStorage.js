import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const safeStorage = {
  /**
     * Get a value from storage, using `AsyncStorage` for mobile and `localStorage` for web.
     * @param {string} key - The key to retrieve.
     * @returns {Promise<string | null>} The stored value or null.
     */
  getItem: async key => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(key) || null;
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
      }
    } else {
      try {
        return await AsyncStorage.getItem(key);
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
        return null;
      }
    }
    return null; // Fallback for unsupported environments
  },

  /**
     * Set a value in storage, using `AsyncStorage` for mobile and `localStorage` for web.
     * @param {string} key - The key to store.
     * @param {string} value - The value to store.
     */
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        }
      } catch (error) {
        console.error('Error setting item in localStorage:', error);
      }
    } else {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting item in AsyncStorage:', error);
      }
    }
  },

  /**
     * Remove a value from storage, using `AsyncStorage` for mobile and `localStorage` for web.
     * @param {string} key - The key to remove.
     */
  removeItem: async key => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
    } else {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from AsyncStorage:', error);
      }
    }
  },
};

export default safeStorage;
