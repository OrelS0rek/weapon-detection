const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Update CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'file://*'], // Allow Electron app
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());

// ... rest of your server.js code
// Import routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const authRoute = require('./routes/auth');

// Route setup
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/auth', authRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});