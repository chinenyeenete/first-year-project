const sqlite3 = require("sqlite3").verbose();

// Create or open the database file
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            );
        `,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("User table ready.");
        }
      }
    );
    db.run(
      `
            CREATE TABLE IF NOT EXISTS highscores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                game_name TEXT,
                highscore INTEGER,
                FOREIGN KEY (user_id) REFERENCES users (id),
                UNIQUE (user_id, game_name)
            );
        `,
      (err) => {
        if (err) {
          console.error("Error creating highscores table:", err.message);
        } else {
          console.log("Highscores table ready.");
        }
      }
    );
  }
});

module.exports = db;
