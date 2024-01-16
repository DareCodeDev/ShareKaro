
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

