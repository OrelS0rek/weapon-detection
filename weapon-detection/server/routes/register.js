const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../db'); // Import database connection

const router = express.Router();

// Define the /register route
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)';
    connection.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error saving user:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Username or email already exists.');
        }
        return res.status(500).send('Error registering user.');
      }
      res.status(201).send('User registered successfully.');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
