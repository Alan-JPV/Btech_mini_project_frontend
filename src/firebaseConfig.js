// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAguiRklkjeAkt9TAN0oG4xAePoY02-lco",
  authDomain: "hospitaldb-95879.firebaseapp.com",
  projectId: "hospitaldb-95879",
  storageBucket: "hospitaldb-95879.firebasestorage.app",
  messagingSenderId: "952985422459",
  appId: "1:952985422459:web:2c02540ea2b49a67d530de"
};

// Initialize Firebase
// ✅ Initialize Firebase first
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase authentication
export const auth = getAuth(app);

// ✅ Export Firebase app (optional)
export default app;