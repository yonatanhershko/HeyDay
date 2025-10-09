import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirebaseService from "../../api/services/FirebaseService";

export const useStreakStore = create((set, get) => ({
    // State
    streakCount: 0,
    coins: 0,
    lastMoodDate: null,

    // Load streak data from Firebase -> AsyncStorage -> Zustand
    loadStreak: async (userId) => {
        try {
            // 1. Load from Firebase
            const data = await FirebaseService.getUserStreak(userId); // implement this in FirebaseService
            const streakData = data || {
                streakCount: 0,
                coins: 0,
                lastMoodDate: null,
            };

            // 2. Save to AsyncStorage
            await AsyncStorage.setItem(
                "userStreak",
                JSON.stringify(streakData)
            );

            // 3. Update Zustand state
            set(streakData);
            console.log("Streak loaded successfully:", streakData);
        } catch (err) {
            console.error("Error loading streak:", err);
        }
    },

    // Log mood -> update streak and coins
    logMood: async (userId) => {
        try {
            // 1. Get current state
            const { streakCount, coins, lastMoodDate } = get();

            // 2. Check lastMoodDate
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const lastDate = lastMoodDate ? new Date(lastMoodDate) : null;
            if (lastDate) {
                lastDate.setHours(0, 0, 0, 0);
            }

            const diff = lastDate
                ? Math.floor((today - lastDate) / (1000 * 60 * 60 * 24))
                : null;

            let newStreak = streakCount;
            let newCoins = coins;

            if (diff === 0) {
                // Already logged today
                return;
            } else if (diff === 1) {
                // Streak continues
                newStreak = streakCount + 1;
                if (streakCount >= 1) {
                    // Only add coins if previous streak ≥ 1
                    newCoins = coins + 10;
                }
            } else {
                // Missed days, reset streak
                newStreak = 1;
                // No coins on first day
            }

            const updated = {
                streakCount: newStreak,
                coins: newCoins,
                lastMoodDate: today.toISOString(),
            };

            // 3. Save to AsyncStorage immediately
            await AsyncStorage.setItem("userStreak", JSON.stringify(updated));

            // 4. Update Zustand state
            set(updated);

            // 5. Save to Firebase in background
            FirebaseService.saveUserStreak(userId, updated); // implement in FirebaseService
        } catch (err) {
            console.error("Error logging streak:", err);
        }
    },

    // Optional: reset streak manually
    resetStreak: async (userId) => {
        const resetData = { streakCount: 0, coins: 0, lastMoodDate: null };
        await AsyncStorage.setItem("userStreak", JSON.stringify(resetData));
        set(resetData);
        FirebaseService.saveUserStreak(userId, resetData);
    },
}));
