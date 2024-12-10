// firebase.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCE1UgYdrXo1rltp73-0TJFHhR0OeSLLm0",
  authDomain: "intrack-pro.firebaseapp.com",
  projectId: "intrack-pro",
  storageBucket: "intrack-pro.firebasestorage.app",
  messagingSenderId: "191656983900",
  appId: "1:191656983900:web:68e1292e114147446e9599",
  measurementId: "G-LYTTPBRQ7Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const firestore =getStorage(app);
const storage = getStorage(app);
export { auth, firestore , storage, db };
