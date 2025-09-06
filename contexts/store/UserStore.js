import { create } from 'zustand';
import FirebaseService from '../../api/services/FirebaseService';

// Zustand store for user/session and UI preferences

export const useUserStore = create((set, get) => ({
  // Auth/session
  isLoggedIn: false,
  userInfo: null, // { first_name, phone_number, etc. }
  User: null, //  auth user object
  newUserData: null, // Firebase user object for RTDB operations
  newUser: null, // Temporary storage for new user data during onboarding
  onboardingCompleted: false, // Track if user completed onboarding
  authLoading: true, // Track if auth state is still loading

  // Preferences
  language: 'he', // default, will be overridden by i18n on load
  darkTheme: null, // nullable boolean: null = follow system
  authorizedLessons: {},

  // Getters (used in components)
  // getDarkTheme: () => get().darkTheme,

  // Setters
  setLanguage: (language) => set({ language }),
  // setDarkTheme: (isDark) => set({ darkTheme: isDark }),
  setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setUser: (User) => set({ User }),
  setNewUser: async (newUserData) => {
    const state = get();
    
    // Set the newUser data first
    set({ newUser: newUserData });
    
    // If we have a newUserData, save to database
    if (newUserData) {
      try {
        await FirebaseService.saveOnboardingData(newUserData);
        
        // After successful save, update userInfo and complete onboarding
        set({ 
          userInfo: newUserData,
          onboardingCompleted: true,
          isLoggedIn: true
        });
        
        console.log('Onboarding data saved and user logged in successfully');
        return true;
      } catch (error) {
        console.error('Failed to save onboarding data:', error);
        throw error;
      }
    } else {
      console.error('No newUserData found - cannot save to database');
    }
  },
  setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),
  setAuthLoading: (loading) => set({ authLoading: loading }),
  
  // Login with user info
  loginUser: (userInfo) => set({ 
    isLoggedIn: true, 
    userInfo 
  }),
  
  // Logout
  logout: () => set({ 
    isLoggedIn: false, 
    userInfo: null,
    User: null,
    onboardingCompleted: false,
    authLoading: false
  }),
}));
