import { database } from '../../firebaseConfig';
import { ref, set, get, update } from 'firebase/database';

class FirebaseService {
  /**
   * Save user onboarding data to Firebase Realtime Database
   * @param {Object} onboardingData - The onboarding data to save
   * @returns {Promise<boolean>} - Success status
   */
  async saveOnboardingData(onboardingData) {
    try {
      const userRef = ref(database, `users/${onboardingData.name}`);
      
      // Prepare the data to save
      const userData = {
        ...onboardingData,
        updatedAt: new Date().toISOString(),
        onboardingCompleted: true
      };

      await set(userRef, userData);
      console.log('Onboarding data saved successfully to Firebase RTDB');
      return true;
    } catch (error) {
      console.error('Error saving onboarding data to Firebase:', error);
      throw error;
    }
  }

  /**
   * Get user data from Firebase Realtime Database
   * @param {string} userId - The user ID
   * @returns {Promise<Object|null>} - User data or null if not found
   */
  async getUserData(userId) {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.error('Error getting user data from Firebase:', error);
      throw error;
    }
  }

  /**
   * Update user data in Firebase Realtime Database
   * @param {string} userId - The user ID
   * @param {Object} updates - The data to update
   * @returns {Promise<boolean>} - Success status
   */
  async updateUserData(userId, updates) {
    try {
      const userRef = ref(database, `users/${userId}`);
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await update(userRef, updateData);
      console.log('User data updated successfully in Firebase RTDB');
      return true;
    } catch (error) {
      console.error('Error updating user data in Firebase:', error);
      throw error;
    }
  }
}

export default new FirebaseService();
