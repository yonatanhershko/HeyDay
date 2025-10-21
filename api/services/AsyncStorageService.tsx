import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARD_KEY = "hasFinishedOnboarding";
const LAST_MOOD_SUBMISSION_KEY = "lastMoodSubmission";
const THEME_KEY = "userThemePreference";

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


// Save theme preference (null = system, true = dark, false = light)
export const setThemePreference = async (isDark: boolean | null) => {
  try {
    const value = isDark === null ? "system" : isDark ? "dark" : "light";
    await AsyncStorage.setItem(THEME_KEY, value);
    console.log("Theme preference saved:", value);
  } catch (err) {
    console.log("Error saving theme preference", err);
  }
};

// Get theme preference
export const getThemePreference = async (): Promise<boolean | null> => {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    if (value === "dark") return true;
    if (value === "light") return false;
    return null; // system default
  } catch (err) {
    console.log("Error getting theme preference", err);
    return null;
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