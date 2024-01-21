// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
  measurementId: "G-WDWL00FQXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider(app);

// Sign In Firebase Code

const SIGNIN = document.getElementById("SignIn");
SIGNIN.addEventListener("click", (e) => {
  // e.preventDefault();

  const email = document.getElementById("SiEmail").value;
  const password = document.getElementById("SiPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const username = document.getElementById("SuName").value;
      const user = userCredential.user;
      alert("Sign in complete, Welcome back!✨");
      // Encode user data as URL parameters
      const userDataParams = new URLSearchParams({
        displayName: username,
        email: user.email,
        photoURL: 'https://img.freepik.com/premium-vector/people-ribbon-logo-modern-leadership-logo-human-charity-logo_327835-2463.jpg',
      });

      // Redirect to the new HTML page with URL parameters
      window.location.href = `./MAIN-PAGE/main.html?${userDataParams.toString()}`;

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
      alert("Sign Up success " + username + "! Go and Sign In");
      window.location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Sigh In With Google

const GoogleSign1 = document.getElementById("Google-btn1");
const GoogleSign2 = document.getElementById("Google-btn2");

var NameDisplay = document.getElementById("Display-Username");
var ImgDisplay = document.getElementById("Display-Userimg");
var EmailDisplay = document.getElementById("Display-Useremail");

GoogleSign1.addEventListener("click", (e) => {
  // e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // Encode user data as URL parameters
      const userDataParams = new URLSearchParams({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      // Redirect to the new HTML page with URL parameters
      window.location.href = `./MAIN-PAGE/main.html?${userDataParams.toString()}`;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

GoogleSign2.addEventListener("click", (e) => {
  // e.preventDefault();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // Encode user data as URL parameters
      const userDataParams = new URLSearchParams({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      // Redirect to the new HTML page with URL parameters
      window.location.href = `./MAIN-PAGE/main.html?${userDataParams.toString()}`;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// const SignoutBtn = document.getElementById("Signout-btn");
// SignoutBtn.addEventListener("click", (e) => {
//     // e.preventDefault();
//     // sessionStorage.clear();
//     // localStorage.clear();
//     // window.close();
// window.open('https://darecodedev.github.io/ShareKaro/');

// });
