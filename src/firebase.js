// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEmZq3DrefxDdRh7JbtMKs_iQVxqCQWfM",
  authDomain: "forauth-b3129.firebaseapp.com",
  projectId: "forauth-b3129",
  storageBucket: "forauth-b3129.appspot.com",
  messagingSenderId: "216330957942",
  appId: "1:216330957942:web:1c5c02ba9d876842ec9b57",
  measurementId: "G-ZNHY17F3KV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);