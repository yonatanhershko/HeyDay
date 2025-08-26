import Constants from 'expo-constants';
import { Platform } from 'react-native';
import config from '../config.json';

// Global flag to indicate if app version is outdated
// This can be imported and checked by any component
export let isAppVersionOutdated = false;

// Callback to be called when version is outdated
let onVersionOutdatedCallback = null;

// Cache for version check results to avoid repeated API calls
let versionCheckCache = {
  isChecking: false,
  lastCheckTime: 0,
  isOutdated: false,
  message: null,
  latestVersion: null,
};

// Export the version check cache to allow other modules to check if version is outdated
export const getVersionCheckStatus = () => ({
  isOutdated: versionCheckCache.isOutdated,
  message: versionCheckCache.message,
  latestVersion: versionCheckCache.latestVersion,
});

// Minimum time between version checks (5 minutes)
const MIN_CHECK_INTERVAL = 60 * 60 * 1000;

/**
 * Performs a version check against the backend
 * This is the ONLY request that should be made before the version check is complete
 * @returns {Promise<{isOutdated: boolean, message: string|null, latestVersion: string|null}>}
 */
export const performVersionCheck = async () => {
  const currentTime = Date.now();

  // Version check is being performed

  // If we're already checking or checked recently, return cached result
  if (
    versionCheckCache.isChecking ||
    (currentTime - versionCheckCache.lastCheckTime < MIN_CHECK_INTERVAL)
  ) {
    // Using cached version check result
    return {
      isOutdated: versionCheckCache.isOutdated,
      message: versionCheckCache.message,
      latestVersion: versionCheckCache.latestVersion,
    };
  }

  // Get current app version
  const { version: currentAppVersion } = Constants.expoConfig;
  if (!currentAppVersion) {
    // Handle missing app version gracefully
    return { isOutdated: false, message: null, latestVersion: null };
  }

  versionCheckCache.isChecking = true;

  try {
    // Make direct API call using fetch (NOT axios) to avoid circular dependency issues
    // This is the ONLY request that should be made before the app is fully initialized
    const url = `${config.customAPIConfig.baseURL}${config.customAPIConfig.userBlueprint}/version-check`;//customAPIConfig do not exist
    const platform = Platform.OS.toLowerCase();

    const response = await fetch(`${url}?version=${currentAppVersion}&platform=${platform}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': config.customAPIConfig.APIKey,//customAPIConfig do not exist
      },
    });

    const data = await response.json();

    // Process version check response

    // Update cache
    versionCheckCache.isChecking = false;
    versionCheckCache.lastCheckTime = currentTime;

    if (data && !data.success) {
      // Update cache and global flag
      versionCheckCache.isOutdated = true;
      versionCheckCache.message = data.message;
      versionCheckCache.latestVersion = data.current_version;

      // Set global flag that can be checked by any component
      isAppVersionOutdated = true;

      // Trigger callback if set
      if (onVersionOutdatedCallback) {
        triggerVersionOutdatedCallback(data.message, data.current_version);
      }

      return {
        isOutdated: true,
        message: data.message,
        latestVersion: data.current_version,
      };
    } else {
      versionCheckCache.isOutdated = false;
      versionCheckCache.message = null;
      versionCheckCache.latestVersion = null;

      return {
        isOutdated: false,
        message: null,
        latestVersion: null,
      };
    }
  } catch (error) {
    // Handle version check errors gracefully
    versionCheckCache.isChecking = false;
    return { isOutdated: false, message: null, latestVersion: null };
  }
};

/**
 * Resets the version check cache and global flag
 */
export const resetVersionCheckCache = () => {
  // Reset cache
  versionCheckCache = {
    isChecking: false,
    lastCheckTime: 0,
    isOutdated: false,
    message: null,
    latestVersion: null,
  };

  // Reset global flag
  isAppVersionOutdated = false;
};

/**
 * Gets the current app version
 * @returns {string|null} The current app version
 */
export const getCurrentAppVersion = () => {
  try {
    return Constants.expoConfig.version || null;
  } catch (error) {
    // Handle error getting app version
    return null;
  }
};

/**
 * Sets the callback to be called when version is outdated
 * @param {Function} callback - Function to call when version is outdated
 */
export const setVersionOutdatedCallback = callback => {
  onVersionOutdatedCallback = callback;
};

/**
 * Triggers the version outdated callback if set
 * @param {string} message - The message to display
 * @param {string} latestVersion - The latest version available
 */
export const triggerVersionOutdatedCallback = (message, latestVersion) => {
  if (onVersionOutdatedCallback) {
    onVersionOutdatedCallback(message, latestVersion);
  }
};
