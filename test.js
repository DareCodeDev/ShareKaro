import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { gatAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA76fMaqnC91Bx1xjVfVU-X1NZSZvaaYpI",
  authDomain: "test-f7d85.firebaseapp.com",
  projectId: "test-f7d85",
  storageBucket: "test-f7d85.appspot.com",
  messagingSenderId: "376291333794",
  appId: "1:376291333794:web:2b93f15f7d6640525369fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = gatAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const GoogleButton = document.getElementById("googleSignInButton");
GoogleButton.addEventListener("Click", function(){

    console.log("hello")
});