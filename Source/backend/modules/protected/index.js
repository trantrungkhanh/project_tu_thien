// API bảo vệ, yêu cầu phải có token
const express = require('express');
const router = express.Router();

router.get('/api/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        res.json({ message: 'Access granted', user: decoded });
    });
});

module.exports = router;