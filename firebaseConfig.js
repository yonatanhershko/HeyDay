import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import config from './config.json';


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


// Analytics may not work properly in Expo development mode, but will work in production
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Firebase analytics initialization failed:", error.message);
}

// Initialize Realtime Database
const database = getDatabase(app);

// Export Firebase instances
export { app, database, analytics, firebaseConfig as default };
