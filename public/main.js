const API_URL = "http://localhost:3000/api/users"; // Adjust for your backend URL

// Elements
const authForm = document.getElementById("auth-form");
const loginForm = document.getElementById("login-form");
const toggleSignup = document.getElementById("toggle-signup");
const gameHeader = document.getElementById("game-header");
const gameMain = document.getElementById("game-main");
const logoutBtn = document.getElementById("logout-btn");

// State
let isSignup = false;

// Toggle between login and sign-up
toggleSignup.addEventListener("click", (e) => {
  e.preventDefault();
  isSignup = !isSignup;
  document.querySelector("#auth-form h2").textContent = isSignup
    ? "Sign Up"
    : "Login";
  toggleSignup.textContent = isSignup
    ? "Already have an account? Login"
    : "Don't have an account? Sign up";
});

// Handle form submission
loginForm.addEventListener("submit", async (e) => {
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
        showGameSection();
      } else {
        // Registration successful
        alert("Account created successfully! Please log in.");
        toggleSignup.click(); // Switch to login
      }
    } else {
      throw new Error(data.error || "Something went wrong");
    }
  } catch (err) {
    alert(err.message);
  }
});

// Show the game section after login
function showGameSection() {
  authForm.style.display = "none";
  gameHeader.style.display = "block";
  gameMain.style.display = "block";
}

// Handle logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token"); // Clear the token
  authForm.style.display = "block";
  gameHeader.style.display = "none";
  gameMain.style.display = "none";
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
