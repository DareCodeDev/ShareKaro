import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF6s9MhIWvOpd-rLMtg5acMVyfKvHvJdg",
  authDomain: "pichunt-e18a2.firebaseapp.com",
  projectId: "pichunt-e18a2",
  storageBucket: "pichunt-e18a2.appspot.com",
  messagingSenderId: "433707920785",
  appId: "1:433707920785:web:21f6f3acbfefeefb263e30",
  measurementId: "G-GYXJKDHSZH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Function to sign up a user
export async function signUp(email, password, username) {
  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user profile with the provided username
      await updateProfile(userCredential.user, { displayName: username });

      return userCredential.user;
  } catch (error) {
      throw error;
  }
}

export async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
}

export async function signOutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
}

export function checkAuthState(callback) {
    auth.onAuthStateChanged(callback);
}
