const express = require('express');
const ApiKey = require('../models/ApiKey');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/generate-key', authenticate, async (req, res) => {
    try {
        const apiKey = require('crypto').randomBytes(16).toString('hex');
        console.log("ApiKey: ", apiKey);
        await ApiKey.create(req.user.id, apiKey);
        res.json({ apiKey });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate API key.' });
    }
});

module.exports = router;