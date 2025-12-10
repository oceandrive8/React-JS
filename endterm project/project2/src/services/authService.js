
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCM3BmytKmyKngYFWLcjBfXME0zA8WQEfY",
  authDomain: "music-5d04f.firebaseapp.com",
  projectId: "music-5d04f",
  storageBucket: "music-5d04f.firebasestorage.app",
  messagingSenderId: "180734173138",
  appId: "1:180734173138:web:fccb0a5a16bca49df6320b",
  measurementId: "G-0WQH8FREH3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authStateChanged = (callback) => onAuthStateChanged(auth, callback);
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
