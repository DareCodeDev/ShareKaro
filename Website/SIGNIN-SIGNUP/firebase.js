// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANjLMcLQmTxJuJrveQkKxZJSjKpx7BNo4",
  authDomain: "register-ef034.firebaseapp.com",
  projectId: "register-ef034",
  storageBucket: "register-ef034.appspot.com",
  messagingSenderId: "911777230460",
  appId: "1:911777230460:web:199a26fbb7a9e46e89e3f9",
  measurementId: "G-WDWL00FQXP"
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
    alert("Welcome back!✨");
    window.location.replace("./MAIN-PAGE/main.html");
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




