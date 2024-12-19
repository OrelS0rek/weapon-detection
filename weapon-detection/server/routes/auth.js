// /server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Move this import up

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const router = express.Router();

// Add cookie-parser middleware after router initialization
router.use(cookieParser());

// Validate JWT token
router.get('/validate-token', (req, res) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Verify token
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
