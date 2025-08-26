// axiosConfig.js
import axios from 'axios';
import AuthService from '../../contexts/authService';
import Config from '../../config.json';
import { Platform } from 'react-native';
import safeStorage from '../../components/general/low_level/safeAsyncStorage';
let signOutCallback = null;
let getDeviceIdCallback = null;

// Flags to track version check status
let versionCheckPerformed = false;
let blockRequests = true; // Default to blocking all requests until version check is done

// Flag to track if we're currently in the process of checking version
// This is used to prevent any requests from being sent during the version check
let isCheckingVersion = true;

export const setSignOutCallback = callback => {
  signOutCallback = callback;
};

export const setGetDeviceIdCallback = callback => {
  getDeviceIdCallback = callback;
};

// Function to mark that version check has been completed
export const setVersionCheckPerformed = () => {
  versionCheckPerformed = true;
};

// Function to block or unblock all requests
export const blockAllRequests = block => {
  blockRequests = block;
};

// Function to set whether we're currently checking version
export const setIsCheckingVersion = checking => {
  isCheckingVersion = checking;
};

const instance = axios.create({
  baseURL: Config.customAPIConfig.baseURL,//customAPIConfig do not exist
  headers: {
    'X-API-Key': Config.customAPIConfig.APIKey,//customAPIConfig do not exist
    'Content-Type': 'application/json',
    ...(Platform.OS !== 'web' && { 'Origin': Config.baseURL }),
  },
  withCredentials: true,
  exposedHeaders: ['x-new-token'],
});

instance.interceptors.request.use(
  async config => {
    try {
      // If we're checking version, only allow the version-check request
      if ((isCheckingVersion || blockRequests) && !config.url.includes('/version-check')) {
        return Promise.reject({ __BLOCKED_BY_VERSION_CHECK__: true, config });
      }

      const token = await AuthService.getStoredIdToken();
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }

      // Get language from storage
      const language = await safeStorage.getItem('HeyDay_selectedLanguage');
      config.headers['Accept-Language'] = language || 'he';

      if (getDeviceIdCallback) {
        const deviceId = await getDeviceIdCallback();
        config.headers['X-Device-ID'] = deviceId;
      } else {
        config.headers['X-Device-ID'] = 'UnknownDevice';
      }
      const deviceType = Platform.OS === 'web' ? 'web' : 'mobile';
      config.headers['X-Device-Type'] = deviceType;
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

// Queue for storing blocked requests
const requestQueue = [];

// Function to process the request queue
// If clearOnly is true, it will clear the queue without processing the requests
export const processRequestQueue = (clearOnly = false) => {

  // If we just want to clear the queue without processing
  if (clearOnly) {
    // Clear the queue without processing
    requestQueue.length = 0;
    return;
  }

  // Only process queue if version check is completed and requests are not blocked
  if (versionCheckPerformed && !blockRequests && !isCheckingVersion) {
    // Process all queued requests
    // Process queued requests if any exist

    // Create a copy of the queue and clear the original
    const queueCopy = [...requestQueue];
    requestQueue.length = 0;

    // Process each request in the queue
    queueCopy.forEach(config => {
      // Process the queued request
      // Process each request silently
      instance(config).catch(() => {});
    });
  } else {
    // Not processing queue because conditions aren't met
  }
};

instance.interceptors.response.use(
  async response => {
    // Try to get the token from the exposed headers
    const newToken = response.headers['x-new-token'];

    if (newToken) {
      try {
        await AuthService.saveIdToken(newToken);
      } catch (error) {
        console.error('Error saving token:', error);
      }
    }

    return response;
  },
  async error => {
    // Check if this is a request blocked by version check
    if (error.__BLOCKED_BY_VERSION_CHECK__) {
      // Queue the request to be processed later
      requestQueue.push(error.config);
      return new Promise(() => { }); // Never resolves, effectively blocking the request
    }

    // Check if the error is a network error
    if (error.message === 'Network Error' || !error.response) {
      console.error('No response received from server: Network Error');
    } else if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;

      // Handling logout requirement or unauthorized access
      if (
        status === 401 ||
        status === 403 ||
        (errorData && errorData.error === 'logout_required')
      ) {
        if (signOutCallback) {
          await signOutCallback();
        } else {
          console.error('SignOut callback not set');
        }
      }

      // Logging additional error details if available
      console.error('Error response data:', errorData || 'No error data');
      console.error('Error status:', status);
      console.error('Error headers:', error.response.headers);
    } else {
      console.error('No response received:', error.message);
    }

    return Promise.reject(error);
  },
);

export default instance;
