// routes/login.js

const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../db'); // Import database connection
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config();
const secretKey = process.env.JWT_SECRET
const router = express.Router();

// Define the /login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM Users WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send('Server error.');
      }
      if (results.length === 0) {
        return res.status(400).send('Invalid username or password.');
      }
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(400).send('Invalid username or password.');
      }

      // JWT Authentication to create Login Sessions and persistent Login
      const token = jwt.sign({id: user.id, username: user.username }, secretKey, {expiresIn: "1h"});
      res.cookie(token, "token", {
        httpOnly: true,
      });
      res.status(200).send('Login successful');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
