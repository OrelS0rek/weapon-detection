const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const router = express.Router();

// Add cookie-parser middleware
router.use(cookieParser());

// Add CORS middleware specifically for this route
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.post('/', async (req, res) => {
  console.log('Login attempt received:', req.body);
  const { username, password } = req.body;
  
  if (!username || !password) {
      return res.status(400).send('Username and password are required.');
  }

  try {
      const query = 'SELECT * FROM Users WHERE username = ?';
      connection.query(query, [username], async (err, results) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).send('Server error during database query.');
          }

          if (results.length === 0) {
              return res.status(400).send('Invalid username or password.');
          }

          const user = results[0];
          try {
              const isPasswordValid = await bcrypt.compare(password, user.password_hash);
              if (!isPasswordValid) {
                  return res.status(400).send('Invalid username or password.');
              }

              const token = jwt.sign(
                  { id: user.id, username: user.username },
                  secretKey,
                  { expiresIn: "1h" }
              );

              // Store the token in the response body (for Electron to capture)
              res.cookie('token', token, {
                  httpOnly: true,
                  secure: false,
                  maxAge: 3600000, // 1 hour
                  sameSite: 'lax',
              });

              // Send the token to the client (Electron app) to store in local storage
              res.status(200).json({ message: 'Login successful', token });
              console.log('Login successful, token set');
          } catch (bcryptError) {
              console.error('Password comparison error:', bcryptError);
              res.status(500).send('Error validating password.');
          }
      });
  } catch (error) {
      console.error('Server error:', error);
      res.status(500).send('Server error during login process.');
  }
});

module.exports = router;