// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF6s9MhIWvOpd-rLMtg5acMVyfKvHvJdg",
  authDomain: "pichunt-e18a2.firebaseapp.com",
  projectId: "pichunt-e18a2",
  storageBucket: "pichunt-e18a2.appspot.com",
  messagingSenderId: "433707920785",
  appId: "1:433707920785:web:21f6f3acbfefeefb263e30",
  measurementId: "G-GYXJKDHSZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Sign In Firebase Code

const SIGNIN  = document.getElementById("SignIn");
SIGNIN.addEventListener("click", (e) =>{
  // e.preventDefault();

  const email = document.getElementById("SiEmail").value;
  const password = document.getElementById("SiPassword").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Sign in complete with existing user!");
    alert(user.email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
});


// Sign Up Firebase Code

const SIGNUP = document.getElementById("SignUp");
SIGNUP.addEventListener("click", (e) => {
  // e.preventDefault();

  const email = document.getElementById("SuEmail").value;
  const password = document.getElementById("SuPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
  
    .then((userCredential) => {
      // Signed up
      const username = document.getElementById("SuName").value;
      const user = userCredential.user;
      alert("Sign Up success " + username + "! Go and Sign In")
      window.location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);

    });
});




