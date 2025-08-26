// authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

let tokenCallback = null;

export const setTokenCallback = callback => {
  tokenCallback = callback;
};

class AuthService {

  /**
     * Retrieves the stored ID token from AsyncStorage.
     * @returns {Promise<string|null>} The stored ID token, or null if not found.
     */
  async getStoredIdToken () {
    try {
      const tokenFromAsyncStorage = await AsyncStorage.getItem('idToken');
      // Notify the token callback if available
      if (tokenCallback && tokenFromAsyncStorage) {
        tokenCallback(tokenFromAsyncStorage);
      }
      return tokenFromAsyncStorage;
    } catch (error) {
      console.error('Error getting stored ID token:', error);
      return null;
    }
  }


}

export default new AuthService();
