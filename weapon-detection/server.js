// Import dependencies
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware to parse JSON in requests
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Set up MySQL database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // e.g., localhost
  user: process.env.DB_USER,       // e.g., root
  password: process.env.DB_PASSWORD, // Your MySQL password
  database: process.env.DB_NAME    // e.g., user_management
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the server if database connection fails
  }
  console.log('Connected to MySQL database.');
});

// Define the /register API endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert the new user into the database
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

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
