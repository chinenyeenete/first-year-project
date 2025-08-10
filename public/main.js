const API_URL = "http://localhost:3000/api/users"; // Adjust for your backend URL

// Modal Elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authModal = document.getElementById("auth-modal");
const closeModal = document.getElementById("close-modal");
const authForm = document.getElementById("auth-form");
const authTitle = document.getElementById("auth-title");
const authToggle = document.getElementById("auth-toggle");
const toggleSignup = document.getElementById("toggle-signup");
const authBtn = document.getElementById("auth-btn");
const authArea = document.getElementById("auth-area");
const userInfo = document.getElementById("user-info");
const usernameDisplay = document.getElementById("username-display");

let isSignup = false; // Tracks whether the user is signing up

// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token && username) {
    showUserInfo(username);
  }
});

// Open the modal
loginBtn.addEventListener("click", () => {
  authModal.style.display = "flex";
});

// Close the modal
closeModal.addEventListener("click", () => {
  authModal.style.display = "none";
});

// Toggle between login and signup
toggleSignup.addEventListener("click", (e) => {
  e.preventDefault();
  isSignup = !isSignup;
  authTitle.textContent = isSignup ? "Sign Up" : "Login";
  authBtn.textContent = isSignup ? "Sign Up" : "Login";
  authToggle.textContent = isSignup
    ? "Already have an account?"
    : "Don't have an account?";
  toggleSignup.textContent = isSignup ? "Sign Up" : "Login";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", (e) => {
  if (e.target === authModal) {
    authModal.style.display = "none";
  }
});

// Handle form submission
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      `${API_URL}/${isSignup ? "register" : "login"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      if (!isSignup) {
        // Login successful
        localStorage.setItem("token", data.token); // Save the JWT token
        localStorage.setItem("username", username);
        alert(`Welcome back, ${username}!`);
        showUserInfo(username);
      } else {
        // Registration successful
        alert("Account created successfully! Please log in.");
        toggleSignup.click(); // Switch back to login view
      }
      authModal.style.display = "none"; // Close the modal
    } else {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (err) {
    alert(err.message);
  }
});

// Show user info and logout button
function showUserInfo(username) {
  loginBtn.style.display = "none";
  userInfo.style.display = "inline";
  usernameDisplay.textContent = username;
}

// Handle logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  loginBtn.style.display = "inline";
  userInfo.style.display = "none";
  alert(`Logged Out Successfully!`);
});

function loadGame(game) {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = ""; // Clear previous game content

  let gameHTML = "";

  switch (game) {
    case "businessOutfittedBob":
      gameHTML = `<iframe src="./business-outfitted-bob/index.html" width="800" height="700"></iframe>`;
      break;
    case "cubeMatcher":
      gameHTML = `<iframe src="./cube-matcher/index.html" width="800" height="700"></iframe>`;
      break;
    case "electricMouse":
      gameHTML = `<iframe src="./electric-mouse/index.html" width="800" height="700"></iframe>`;
      break;
    case "moleUnearther":
      gameHTML = `<iframe src="./mole-unearther/index.html" width="800" height="700"></iframe>`;
      break;
    case "treasureHunter":
      gameHTML = `<iframe src="./treasure-hunter/index.html" width="800" height="700"></iframe>`;
      break;
    // Additional cases for each game
  }

  gameContainer.innerHTML = gameHTML;
}

function toggleFullscreen() {
  const gameContainer = document.getElementById("gameContainer");

  if (!document.fullscreenElement) {
    gameContainer.requestFullscreen().catch((err) => {
      console.log(
        `Error attempting to enable full-screen mode: ${err.message}`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

