const sqlite3 = require('sqlite3').verbose();

// Create or open the database file
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                highscore INTEGER DEFAULT 0
            );
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('User table ready.');
            }
        });
    }
});

module.exports = db;
