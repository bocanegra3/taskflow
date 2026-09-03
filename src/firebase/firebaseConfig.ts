import {
  initializeApp,
  getApp,
  getApps,
} from "firebase/app";

import {
  initializeAuth,
  getAuth,

  // TypeScript puede no detectar esta exportación
  // aunque Firebase la incluye para React Native.
  // @ts-expect-error Firebase RN TypeScript declaration issue
  getReactNativePersistence,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import AsyncStorage from
  "@react-native-async-storage/async-storage";


// --------------------------------------------------
// CONFIGURACIÓN FIREBASE
// --------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBzd2zNIyZyO5bWrqm3DsBhWZl6K-e0l3w",
  authDomain: "sifonadosapp.firebaseapp.com",
  projectId: "sifonadosapp",
  storageBucket: "sifonadosapp.firebasestorage.app",
  messagingSenderId: "816610522395",
  appId: "1:816610522395:web:97be3c78ed7cdbf40c0fbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication con persistencia.
//
// Esto permite que si cerrás la app
// y volvés a abrirla,
// Firebase recuerde la sesión.
export const auth = initializeAuth(app, {
  persistence:
    getReactNativePersistence(
      AsyncStorage
    ),
});


// Base de datos Firestore
export const db =
  getFirestore(app);