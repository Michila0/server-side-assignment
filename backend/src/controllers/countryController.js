const db = require('../dao/initDB');
const bcrypt = require('bcryptjs');

//GET all countries
exports.getCountryData = async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(400).json({ message: 'Missing API Key' });

    db.get('SELECT * FROM users WHERE email = ?', [req.user.email], async (err, user) => {
        if (err || !user) return res.status(403).json({ message: 'User not found' });

        if (!user.apiKey || !bcrypt.compareSync(apiKey, user.apiKey)) {
            return res.status(403).json({ message: 'Invalid API Key' });
        }

        db.run('UPDATE users SET apiKeyUsage = apiKeyUsage + 1, lastUsed = datetime("now") WHERE id = ?', [user.id]);

        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch countries', error: error.message });
        }
    });
};

//Filter by country name
exports.filterCountryByName = async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Missing country name' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [req.user.email], async (err, user) => {
        if (err || !user) return res.status(403).json({ message: 'User not found' });

        if (!user.apiKey || !bcrypt.compareSync(apiKey, user.apiKey)) {
            return res.status(403).json({ message: 'Invalid API Key' });
        }

        db.run('UPDATE users SET apiKeyUsage = apiKeyUsage + 1, lastUsed = datetime("now") WHERE id = ?', [user.id]);

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
            if (!response.ok) {
                return res.status(404).json({ message: `Country not found: ${name}` });
            }
            const data = await response.json();
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch country', error: error.message });
        }
    });
}
