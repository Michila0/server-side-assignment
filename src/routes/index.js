const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const authCtrl = require('../controller/authController');
const userCtrl = require('../controller/userController');
const countryCtrl = require('../controller/countryController');

// Auth Routes
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// Admin Routes
router.put('/admin/role', auth, role('admin'), userCtrl.changeRole);
router.delete('/admin/delete', auth, role('admin'), userCtrl.deleteUser);
router.get('/admin/usage', auth, role('admin'), userCtrl.getUsage);
router.get('/admin/users',auth, role('admin'),userCtrl.getUsers);
// User Routes
router.get('/countries', auth, role('user'), countryCtrl.getAllCountries);
router.post('/countries/filter', auth, role('user'), countryCtrl.filterCountryByName);

module.exports = router;
