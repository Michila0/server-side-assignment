const axios = require('axios');

const getCountryData = async (req, res) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map(country => ({
            name: country.name.common,
            currency: Object.keys(country.currencies || {}),
            capital: country.capital?.[0],
            languages: Object.values(country.languages || {}),
            flag: country.flags.png
        }));
        res.json(countries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch country data.' });
    }
};

module.exports = { getCountryData };