// Submit High Score Function
function submitHighScore(gameName, score) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Log in to save your high score!");
    return;
  }

  fetch(`http://localhost:3000/api/users/highscore/${gameName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ score }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((err) => {
      console.error("Error submitting highscore:", err);
    });
}

// Fetch High Score Function
function fetchHighScore(gameName) {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.resolve(0); // Default to 0 if not logged in
  }

  return fetch(`http://localhost:3000/api/users/highscore/${gameName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data.highscore || 0)
    .catch((err) => {
      console.error("Error fetching highscore:", err);
      return 0;
    });
}

