const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middleware/auth');

// Import routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route setup
app.use('/register', registerRoute);
app.use('/login', loginRoute);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
