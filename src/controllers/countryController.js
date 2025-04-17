const axios = require('axios');

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

