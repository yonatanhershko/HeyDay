// firebaseApp.
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import config from './config.json';
import { getMessaging } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: config.firebaseConfig.apiKey,
  authDomain: config.firebaseConfig.authDomain,
  databaseURL: config.firebaseConfig.databaseURL,
  projectId: config.firebaseConfig.projectId,
  storageBucket: config.firebaseConfig.storageBucket,
  messagingSenderId: config.firebaseConfig.messagingSenderId,
  appId: config.firebaseConfig.appId,
  measurementId: config.firebaseConfig.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with conditional persistence for React Native
const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });


// Initialize messaging with proper checks
let messaging = null;

if (Platform.OS === 'web' && typeof window !== 'undefined' && 'navigator' in window && 'serviceWorker' in window.navigator) {
  try {
    messaging = getMessaging(app);

    window.navigator.serviceWorker.register('./firebase-messaging-sw.js', {
      scope: '/',
    }).then(registration => {
      // eslint-disable-next-line no-console
      console.info('Service Worker registered with scope:', registration.scope);
    }).catch(e => console.error('error while registrating sw', e));
  } catch (error) {
    console.error('Error initializing messaging:', error);
  }
}

export { auth, messaging };
