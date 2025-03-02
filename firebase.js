// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu61sKX8ID0hnmr-KLnGAxyCofFvMqWww",
  authDomain: "kolowaartscape.firebaseapp.com",
  projectId: "kolowaartscape",
  storageBucket: "kolowaartscape.firebasestorage.app",
  messagingSenderId: "896576129675",
  appId: "1:896576129675:web:e531e2341840bf9837228e",
  measurementId: "G-5W3KKMG4QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);