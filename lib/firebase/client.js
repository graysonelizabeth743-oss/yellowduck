import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const REQUIRED_KEYS = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
};

// measurementId (Analytics) is optional.
const missingKeys = Object.entries(REQUIRED_KEYS)
  .filter(([key]) => !firebaseConfig[key])
  .map(([, envName]) => envName);

export const isFirebaseConfigured = missingKeys.length === 0;

if (!isFirebaseConfigured) {
  // Do NOT throw here: throwing at import time breaks `next build` (static
  // prerendering) and crashes every page that imports this module.
  console.warn(
    `[Yellowduck] Firebase is not configured. Add these variables to .env.local: ${missingKeys.join(", ")}`
  );
}

// When env vars are missing we still initialise with inert placeholder values
// so the app builds and renders; Firebase calls will simply fail at runtime
// with a clear auth/network error until real credentials are supplied.
const resolvedConfig = isFirebaseConfigured
  ? firebaseConfig
  : {
      apiKey: "missing-api-key",
      authDomain: "missing.firebaseapp.com",
      projectId: "missing-project",
      storageBucket: "missing-project.appspot.com",
      messagingSenderId: "0",
      appId: "1:0:web:0",
    };

// Initialize Firebase (singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(resolvedConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics only runs in the browser and only when configured
export const initAnalytics = async () => {
  if (
    typeof window !== "undefined" &&
    isFirebaseConfigured &&
    firebaseConfig.measurementId &&
    (await isSupported())
  ) {
    return getAnalytics(app);
  }
  return null;
};
