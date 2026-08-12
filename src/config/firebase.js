import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACWuFxySsuxFQjF2tOWVwzp3WUTFlil8g",
  authDomain: "chill-app-8c6e0.firebaseapp.com",
  projectId: "chill-app-8c6e0",
  storageBucket: "chill-app-8c6e0.firebasestorage.app",
  messagingSenderId: "521778266432",
  appId: "1:521778266432:web:5be7dd3db493b462f9baa5",
  measurementId: "G-6F1XM4QXQW",
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
