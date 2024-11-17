// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVZCeV0wJ5X_0ZxHGftrl6IDrByq9pfE0",
  authDomain: "website-ho-tro-bao-lu.firebaseapp.com",
  projectId: "website-ho-tro-bao-lu",
  storageBucket: "website-ho-tro-bao-lu.firebasestorage.app",
  messagingSenderId: "305178727229",
  appId: "1:305178727229:web:ea290ab7a3a4ca443d6b54",
  measurementId: "G-968N7P5H4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Khởi tạo Firebase Auth
const auth = getAuth(app);

export { auth };