const express = require('express');
const connection = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
    const logout = 'update users set isLoggedIn=0 where  = ?'
    connection.query(logout, [u])
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).send('Logged out');
});


module.exports = router;
