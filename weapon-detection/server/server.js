// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const cors = require('cors');



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

// define login API endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Match keys sent from the client
  
  try {
    // Query the database for the user by username
    const query = 'SELECT * FROM Users WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send('Server error.');
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(400).send('Invalid username or password.');
      }

      const user = results[0];
      
      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(400).send('Invalid username or password.');
      }

      // If login is successful
      res.status(200).send('Login successful');
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
