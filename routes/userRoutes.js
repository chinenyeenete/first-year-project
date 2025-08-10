const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// Register a new user
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password." });

    // Insert the new user into the database
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.run(query, [username, hashedPassword], (err) => {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ error: "Username already exists." });
        }
        return res.status(500).json({ error: "Error registering user." });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
});

// Login a user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], (err, user) => {
    if (err) return res.status(500).json({ error: "Error fetching user." });
    if (!user) return res.status(400).json({ error: "User not found." });

    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch)
        return res.status(401).json({ error: "Invalid credentials." });

      // Create a token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token, username: user.username });
    });
  });
});

// Get a user's high score for a specific game
router.get('/highscore/:game_name', (req, res) => {
  const { game_name } = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = 'SELECT highscore FROM highscores WHERE user_id = ? AND game_name = ?';
      db.get(query, [decoded.id, game_name], (err, row) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.json({ highscore: row?.highscore || 0 });
      });
  } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
  }
});

// Update a user's high score for a specific game
router.post('/highscore/:game_name', (req, res) => {
  const { game_name } = req.params;
  const { score } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = `
          INSERT INTO highscores (user_id, game_name, highscore)
          VALUES (?, ?, ?)
          ON CONFLICT(user_id, game_name)
          DO UPDATE SET highscore = MAX(highscore, excluded.highscore);
      `;

      db.run(query, [decoded.id, game_name, score], (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.json({ message: 'Highscore updated!' });
      });
  } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
