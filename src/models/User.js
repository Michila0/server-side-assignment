// src/models/User.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.js.sqlite');
const bcrypt = require('bcryptjs');

class User {
    static async create(username, password) {
        const passwordHash = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO users (username, password_hash) VALUES (?, ?)`;
            db.run(query, [username, passwordHash], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE username = ?`;
            db.get(query, [username], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    static async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = User;