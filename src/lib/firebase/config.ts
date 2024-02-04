// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjCau5KlZA_MymqStWK8q45J4TtiUH_kQ",
  authDomain: "hackaton-orange-squad34.firebaseapp.com",
  projectId: "hackaton-orange-squad34",
  storageBucket: "hackaton-orange-squad34.appspot.com",
  messagingSenderId: "698097934006",
  appId: "1:698097934006:web:3a5d9f5db9854da1525017",
  measurementId: "G-09Y994FNH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
