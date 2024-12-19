const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('Access denied. Please login.');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Add user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error('Invalid token:', err);
        res.status(403).send('Invalid or expired token.');
    }
}

module.exports = authenticateToken;
