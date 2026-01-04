// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWTOu3JBhg3JuZg6snAxhnf_XFhLhLkbc",
  authDomain: "quickpress-web.firebaseapp.com",
  projectId: "quickpress-web",
  storageBucket: "quickpress-web.firebasestorage.app",
  messagingSenderId: "909067547966",
  appId: "1:909067547966:web:fda5e47e1e58ca7ae7a86f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services (GLOBAL use ke liye)
export const auth = getAuth(app);
export const db = getFirestore(app);
