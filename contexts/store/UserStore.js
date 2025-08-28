import { create } from 'zustand';

// Zustand store for user/session and UI preferences

export const useUserStore = create((set, get) => ({
  // Auth/session
  isLoggedIn: false,
  userInfo: null, // { first_name, phone_number, etc. }
  User: null, //  auth user object
  onboardingCompleted: false, // Track if user completed onboarding
  authLoading: true, // Track if auth state is still loading

  // Preferences
  language: 'he', // default, will be overridden by i18n on load
  darkTheme: null, // nullable boolean: null = follow system
  authorizedLessons: {},

  // Getters (used in components)
  getDarkTheme: () => get().darkTheme,

  // Setters
  setLanguage: (language) => set({ language }),
  setDarkTheme: (isDark) => set({ darkTheme: isDark }),
  setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setUser: (User) => set({ User }),
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
