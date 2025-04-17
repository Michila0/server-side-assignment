const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const authCtrl = require('../controllers/authController');
const userCtrl = require('../controllers/useController');
const countryCtrl = require('../controllers/countryController');
const jwt = require('jsonwebtoken');
const db = require('../dao/initDB');

// Auth Routes
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// Admin Routes
router.put('/admin/role', auth, role('admin'), userCtrl.changeRole);
router.delete('/admin/delete', auth, role('admin'), userCtrl.deleteUser);
router.get('/admin/usage', auth, role('admin'), userCtrl.getUsage);
router.get('/admin/users',auth, role('admin'),userCtrl.getUsers);
// User Routes
router.get('/countries', auth, role('user'), countryCtrl.getCountryData);
router.post('/countries/filter', auth, role('user'), countryCtrl.filterCountryByName);
router.post('/genarateApiKey', auth, role('user'), countryCtrl.generateApi);
// GET /auth/me - Get current user profile
router.get('/me', async (req, res) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

db.get(
  `SELECT * FROM users WHERE id = ?`,
  [decoded.id], 
  (err, user) => {
    if (err) {
      console.error('DB Error:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Database error'
      });
    }

    if (!user) {
      console.warn('User not found for ID:', decoded.id);
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.created_at || null
      }
    });
  }
);

          
    } catch (error) {
        console.error('Auth check error:', error);

        // Handle different JWT errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.post('/logout', (req, res) => {
    try {
        // 1. Clear the HTTP-only cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'strict',
            path: '/'
        });

        // 2. Optionally invalidate the token on server-side
        // (If you're using a token blacklist/redis)
        // await invalidateToken(req.cookies.token);

        // 3. Send success response
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during logout'
        });
    }
});

module.exports = router;
