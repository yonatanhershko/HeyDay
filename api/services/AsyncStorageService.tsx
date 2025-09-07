import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARD_KEY = "hasFinishedOnboarding";

// Save onboarding complete
export const setOnboardingDone = async () => {
  try {
    await AsyncStorage.setItem(ONBOARD_KEY, "true");
  } catch (err) {
    console.log("Error saving onboarding state", err);
  }
};

// Check onboarding state
export const hasFinishedOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem(ONBOARD_KEY);
    return value === "true";
  } catch (err) {
    console.log("Error loading onboarding state", err);
    return false;
  }
};


export const clearAllStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All storage cleared ✅");
    } catch (err) {
      console.log("Error clearing storage", err);
    }
  };