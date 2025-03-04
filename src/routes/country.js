// src/routes/country.js
const express = require('express');
const { getCountryData } = require('../controllers/countryController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/countries', authenticate, getCountryData);

module.exports = router;