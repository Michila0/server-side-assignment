const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../dao/initDB');

exports.register = (req, res) => {
    const { email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    const rawApiKey = uuidv4();
    const hashedApiKey = bcrypt.hashSync(rawApiKey, 10);

    db.run('INSERT INTO users (email, password, role, apiKey) VALUES (?, ?, ?, ?)',
        [email, hashed, 'user', hashedApiKey], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'User registered', rawApiKey });
        });
}


exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            secure: false,          // Set true if using HTTPS
            sameSite: 'Lax'         // Adjust for your frontend needs
        });

        res.json({ message: 'Login successful' });
    });
}