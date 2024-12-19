const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).send('Logged out');
});


module.exports = router;
