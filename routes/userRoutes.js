const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

// Update highscore
router.post("/highscore", (req, res) => {
  const { token, highscore } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query =
      "UPDATE users SET highscore = ? WHERE id = ? AND highscore < ?";

    db.run(query, [highscore, decoded.id, highscore], (err) => {
      if (err)
        return res.status(500).json({ error: "Error updating highscore." });
      res.json({ message: "Highscore updated!" });
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
});

module.exports = router;
