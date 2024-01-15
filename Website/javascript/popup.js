import { signUp, signIn, checkAuthState } from "/Website/Firebase/firebase.js"; // Adjust the path accordingly

// Add event listener to show login button
document.getElementById("show-login").addEventListener("click", function () {
  // Toggle the visibility of the popup
  var popup = document.querySelector(".popup");
  popup.style.display =
    popup.style.display === "none" || popup.style.display === ""
      ? "block"
      : "none";
});

// Add event listener to show login button (assuming this is your explore button)
document.getElementById("show_login").addEventListener("click", function () {
  // Toggle the visibility of the popup
  var popup = document.querySelector(".popup");
  popup.style.display =
    popup.style.display === "none" || popup.style.display === ""
      ? "block"
      : "none";
});

// Add event listener to close button
document.getElementById("closePopupBtn").addEventListener("click", function () {
  // Close the popup when close button is clicked
  document.querySelector(".popup").style.display = "none";
});

// Add event listener to show signup button
document.getElementById("show_signup").addEventListener("click", function () {
  // Toggle the visibility of the signup popup
  var signupPopup = document.getElementById("signupPopup");
  signupPopup.style.display =
    signupPopup.style.display === "none" || signupPopup.style.display === ""
      ? "block"
      : "none";
});

// Add event listener to close signup button
document
  .getElementById("closeSignupPopupBtn")
  .addEventListener("click", function () {
    // Close the signup popup when close button is clicked
    document.getElementById("signupPopup").style.display = "none";
  });

// Add event listener to show login button inside the signup form
document
  .getElementById("show_login_signup")
  .addEventListener("click", function () {
    // Toggle the visibility of the login popup
    var loginPopup = document.querySelector(".popup");
    loginPopup.style.display =
      loginPopup.style.display === "none" || loginPopup.style.display === ""
        ? "block"
        : "none";
  });

// Add event listener to signup button inside the popup
document.getElementById('signup').addEventListener('click', async function() {
  // Get user credentials and username from input fields
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const username = document.getElementById('signupUsername').value;

  try {
      // Call the signUp function
      await signUp(email, password, username);

      // Handle successful signup (redirect, show message, etc.)
      console.log('User signed up successfully');

      // Check user authentication state and redirect
      checkAuthState(function(user) {
          if (user) {
              // User is signed in, redirect to profile.html
              window.location.href = '/Website/pages/profile.html';
          } else {
              // No user is signed in, handle accordingly
              console.log('No user signed in after successful signup.');
          }
      });

      // Close the popup after successful signup
      document.querySelector('.popup').style.display = 'none';
  } catch (error) {
      // Handle signup failure (show error message, etc.)
      console.error(error.message);

      // Redirect to error.html
      const errorMessage = encodeURIComponent(error.message || 'Unknown error');
      window.location.href = `/Website/pages/error.html?message=${errorMessage}`;
  }
});

// Add event listener to login button inside the popup
document.getElementById("login").addEventListener("click", async function () {
  // Get user credentials from input fields
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    // Call the signIn function
    await signIn(email, password);

    // Handle successful login (redirect, show message, etc.)
    console.log("User signed in successfully");

    // Check user authentication state and redirect
    checkAuthState(function (user) {
      if (user) {
        // User is signed in, redirect to profile.html
        window.location.href = "/Website/pages/profile.html";
      } else {
        // No user is signed in, handle accordingly
        console.log("No user signed in after successful login.");
      }
    });

    // Close the popup after successful login
    document.querySelector(".popup").style.display = "none";
  } catch (error) {
    console.error("Full error:", error);

    // Handle login failure (show error code and message)
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);

    // Redirect to error.html
    const errorMessage = encodeURIComponent(error.message || "Unknown error");
    window.location.href = `/Website/pages/error.html?message=${errorMessage}`;
  }
});
