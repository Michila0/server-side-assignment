// src/app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require('./routes/auth');
const countryRoutes = require('./routes/country');
const apiKeyRoutes = require('./models/apiKey');
const authenticate = require('./middleware/auth');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Database connection
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/api', authenticate, countryRoutes);
app.use('/api', authenticate, apiKeyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));