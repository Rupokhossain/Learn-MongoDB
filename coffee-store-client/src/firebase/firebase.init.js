// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7cik7737iltNhL3YBw2PQJcWhehgWOlg",
  authDomain: "coffee-store-app-31819.firebaseapp.com",
  projectId: "coffee-store-app-31819",
  storageBucket: "coffee-store-app-31819.firebasestorage.app",
  messagingSenderId: "611669509944",
  appId: "1:611669509944:web:2a44307dde554f26c1a3cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);