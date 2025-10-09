import { database } from "../../firebaseConfig";
import { ref, set, get, update } from "firebase/database";

class FirebaseService {
    /**
     * @returns {string} - 11-character alphanumeric user ID
     */
    generateUserId() {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 11; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Save user onboarding data to Firebase Realtime Database
     * @param {Object} onboardingData - The onboarding data to save
     * @returns {Promise<Object>} - Success status and user data with ID
     */
    async saveOnboardingData(onboardingData) {
        try {
            const userId = this.generateUserId();
            const userRef = ref(database, `users/${userId}`);

            // Prepare the data to save with user ID
            const userData = {
                ...onboardingData,
                userId,
                updatedAt: new Date().toISOString(),
                onboardingCompleted: true,
            };

            await set(userRef, userData);
            return { success: true, userData };
        } catch (error) {
            console.error("Error saving onboarding data to Firebase:", error);
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
                console.log("No user data found");
                return null;
            }
        } catch (error) {
            console.error("Error getting user data from Firebase:", error);
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
                updatedAt: new Date().toISOString(),
            };

            await update(userRef, updateData);
            return true;
        } catch (error) {
            console.error("Error updating user data in Firebase:", error);
            throw error;
        }
    }

    /**
     * Save mood entry to user's moodEntries array
     * @param {string} userId - The user ID
     * @param {Object} moodEntry - The mood entry to save
     * @returns {Promise<boolean>} - Success status
     */
    async saveMoodEntry(userId, moodEntry) {
        try {
            // First get current user data
            const userData = await this.getUserData(userId);

            if (!userData) {
                throw new Error("User not found");
            }

            // Get existing mood entries or initialize empty array
            const existingEntries = userData.moodEntries || [];

            // Add new mood entry
            const updatedEntries = [...existingEntries, moodEntry];

            // Update user data with new mood entries
            await this.updateUserData(userId, {
                moodEntries: updatedEntries,
            });

            return true;
        } catch (error) {
            console.error("Error saving mood entry to Firebase:", error);
            throw error;
        }
    }

    async getUserStreak(userId) {
        try {
            const userRef = ref(database, `users/${userId}`);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                const userData = snapshot.val();
                return {
                    streakCount: userData.streakCount || 0,
                    coins: userData.coins || 0,
                    lastMoodDate: userData.lastMoodDate || null
                };
            }
            
            return { streakCount: 0, coins: 0, lastMoodDate: null };
        } catch (err) {
            console.error("Error getting user streak from Firebase:", err);
            return { streakCount: 0, coins: 0, lastMoodDate: null };
        }
    }

    async saveUserStreak(userId, streakData) {
        try {
            const userRef = ref(database, `users/${userId}`);
            const snapshot = await get(userRef);
            
            let existingData = {};
            if (snapshot.exists()) {
                existingData = snapshot.val();
            }
            
            // Merge streak data with existing user data
            const updatedData = {
                ...existingData,
                streakCount: streakData.streakCount,
                coins: streakData.coins,
                lastMoodDate: streakData.lastMoodDate
            };
            
            await set(userRef, updatedData);
        } catch (err) {
            console.error("Error saving user streak to Firebase:", err);
        }
    }
}

export default new FirebaseService();
