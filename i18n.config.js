import { I18n } from 'i18n-js';
import EventEmitter from 'events';
import { I18nManager, Platform } from 'react-native';
import { reloadAsync } from 'expo-updates';
import { hideAsync } from 'expo-splash-screen';
import safeStorage from './components/general/low_level/safeAsyncStorage';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useUserStore } from './contexts/store/UserStore';

const isRunningInExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/**
 * Dynamically imports all translation files from the given context.
 * @param {Function} requireContext - The require.context function to dynamically import files.
 * @returns {Object} An object containing all imported translations.
 */
const importAll = requireContext =>
  requireContext.keys().reduce((modules, key) => {
    const fileName = key.replace('./', '').replace('.json', '');
    modules[fileName] = requireContext(key);
    return modules;
  }, {});

/**
 * Loads translations for all supported locales.
 * @returns {Object} An object mapping language codes to their translations.
 */
const loadTranslations = () => ({
  en: importAll(require.context('./locales/en', true, /\.json$/)),
  he: importAll(require.context('./locales/he', true, /\.json$/)),
});

/* Constants */
const STORAGE_KEY = 'HeyDay_selectedLanguage';
const DEFAULT_LANGUAGE = 'he';
const SUPPORTED_LANGUAGES = ['en', 'he'];
const RTL_LANGUAGES = ['he'];

/* Storage Helpers */
/**
 * Saves the selected language to persistent storage.
 * @param {string} language - The language code.
 * @returns {Promise<void>}
 */
const saveLanguage = async language => {
  try {
    await safeStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language to storage:', error);
    throw error;
  }
};

/**
 * Retrieves the saved language from persistent storage.
 * @returns {Promise<string|null>} The language code or null if not set.
 */
const getLanguage = async () => {
  try {
    return await safeStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error reading language from storage:', error);
    return null;
  }
};

/**
 * Checks if a given language is an RTL language.
 * @param {string} language - The language code.
 * @returns {boolean} True if the language is RTL.
 */
const isLanguageRTL = language => RTL_LANGUAGES.includes(language);

/**
 * Reloads the app if needed.
 * For web, it reloads the page.
 * For native, if the RTL state has changed, it reloads the app.
 * @param {boolean} wasRTL - Previous RTL state.
 * @param {boolean} isRTL - New RTL state.
 */
const reloadAppIfNeeded = async (wasRTL, isRTL, currentPathname = null) => {
  console.log('reloadAppIfNeeded', wasRTL, isRTL, currentPathname);
  if (Platform.OS === 'web') {
    window.location.reload();
  } else if (wasRTL !== isRTL) {
    if (!isRunningInExpoGo) {
      if (currentPathname) {
        await safeStorage.setItem('lastRoute', JSON.stringify(currentPathname));
      }
      console.log('reloadAppIfNeeded reloadAsync');
      await reloadAsync();
    }
  }
};

/* Global state variables */
let currentIsRTL = isLanguageRTL(DEFAULT_LANGUAGE);
let currentLanguage = DEFAULT_LANGUAGE;

/**
 * Sets the application's locale and adjusts text direction.
 * @param {string} language - The language code.
 * @param {Object} i18nInstance - The i18n instance to update.
 * @returns {boolean} True if the language is RTL.
 */
const setAppLocale = (language, i18nInstance) => {
  const rtl = isLanguageRTL(language);
  currentIsRTL = rtl;
  I18nManager.forceRTL(rtl);
  I18nManager.allowRTL(rtl);

  // Update the i18n instance's locale
  i18nInstance.locale = language;

  return rtl;
};

// Load translations and initialize i18n
const translations = loadTranslations();
const i18n = new I18n(translations);
i18n.events = new EventEmitter();
i18n.enableFallback = true;

/**
 * Determines the language to use based on stored preference, user store preference, or the default.
 * @returns {Promise<string>} The language code.
 */
const determineLanguage = async () => {
  try {
    // First check if user is logged in and has a language preference in UserStore
    const userStore = useUserStore.getState();
    if (userStore.isLoggedIn && userStore.language) {
      return SUPPORTED_LANGUAGES.includes(userStore.language)
        ? userStore.language
        : DEFAULT_LANGUAGE;
    }

    // Otherwise fall back to the saved language in AsyncStorage
    const savedLanguage = await getLanguage();
    return savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;
  } catch (error) {
    console.error('Error determining language:', error);
    return DEFAULT_LANGUAGE;
  }
};

/**
 * Sets the locale asynchronously, saves the new language, updates settings,
 * and reloads the app if necessary.
 * @param {string} language - The language code to set.
 */
const setLocaleAsync = async (language, pathname = null) => {
  console.log('setLocaleAsync', language, pathname);
  if (!SUPPORTED_LANGUAGES.includes(language)) return;

  const wasRTL = isLanguageRTL(currentLanguage);
  const isNowRTL = isLanguageRTL(language);

  try {
    console.log('setLocaleAsync saveLanguage', language);
    await saveLanguage(language);
    console.log('setLocaleAsync setAppLocale', language);
    setAppLocale(language, i18n);
    console.log('setLocaleAsync emit', language);
    i18n.events.emit('languageChanged', language);
    console.log('setLocaleAsync currentLanguage', language);
    currentLanguage = language;

    // Update language in UserStore if user is logged in
    if (useUserStore.getState().isLoggedIn) {
      useUserStore.getState().setLanguage(language);
    }

    await reloadAppIfNeeded(wasRTL, isNowRTL, pathname);
  } catch (error) {
    console.error('Error setting locale:', error);
  }
};

/* i18n Loading State */
let isI18nLoading = true;

/**
 * Returns whether the i18n setup is still loading.
 * Other parts of your app can use this to conditionally render UI, if desired.
 * @returns {boolean}
 */
export const getIsI18nLoading = () => isI18nLoading;

/**
 * Loads and applies the initial locale during app startup.
 */
export const loadInitialLocale = async () => {
  try {
    const language = await determineLanguage();
    currentLanguage = language;
    setAppLocale(language, i18n);

    // Update UserStore language if user is logged in
    const userStore = useUserStore.getState();
    if (userStore.isLoggedIn) {
      userStore.setLanguage(language);
    }

    // For mobile: if the native RTL setting hasn't updated as expected,
    // force a reload so that the layout reflects the RTL configuration.
    if (Platform.OS !== 'web' && I18nManager.isRTL !== isLanguageRTL(language)) {
      if (!isRunningInExpoGo) {
        await reloadAsync();
      }
      return;
    }

    // Update document properties if on web
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = currentIsRTL ? 'rtl' : 'ltr';
    }
  } catch (error) {
    console.error('Error loading initial locale:', error);
  } finally {
    isI18nLoading = false;
    await hideAsync();
  }
};

export const restoreLastRoute = async router => {
  try {
    const lastRoute = await safeStorage.getItem('lastRoute');
    if (lastRoute) {
      router.replace(JSON.parse(lastRoute));
      await safeStorage.removeItem('lastRoute');
    }
  } catch (error) {
    console.error('Error restoring last route:', error);
  }
};

(async () => {
  await loadInitialLocale();
})();
export { determineLanguage as getLocale, currentIsRTL as isRTL, setLocaleAsync };
export default i18n;
