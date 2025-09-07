import { create } from 'zustand';
import FirebaseService from '../../api/services/FirebaseService';
import { setOnboardingDone, hasFinishedOnboarding } from '../../api/services/AsyncStorageService';

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
    
    // Set loading state and newUser data
    set({ 
      newUser: newUserData,
      authLoading: true 
    });
    
    // If we have a newUserData, save to database
    if (newUserData) {
      try {
        const result = await FirebaseService.saveOnboardingData(newUserData);
        
        // Save onboarding completion to AsyncStorage
        await setOnboardingDone();
        
        // After successful save, update userInfo with the data that includes userId
        set({ 
          userInfo: result.userData,
          User: result.userData, // Set User so HeydayIndex recognizes authenticated user
          onboardingCompleted: true,
          isLoggedIn: true,
          authLoading: false
        });
        
        console.log('Onboarding data saved and user logged in successfully with ID:', result.userData.userId);
        return true;
      } catch (error) {
        console.error('Failed to save onboarding data:', error);
        set({ authLoading: false });
        throw error;
      }
    } else {
      console.error('No newUserData found - cannot save to database');
      set({ authLoading: false });
    }
  },
  setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),
  setAuthLoading: (loading) => set({ authLoading: loading }),
  
  // Initialize onboarding state from AsyncStorage
  initializeOnboardingState: async () => {
    try {
      const hasCompleted = await hasFinishedOnboarding();
      set({ onboardingCompleted: hasCompleted });
    } catch (error) {
      console.error('Error initializing onboarding state:', error);
    }
  },
  
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
