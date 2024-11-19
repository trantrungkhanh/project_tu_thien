const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const accountTable = require('../../database/modules/account'); // Đường dẫn đến file db.js
const generateRandomString = require('../services/Utils');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { account_id, full_name, email } = req.body;

    try {
        userDataByEmail = await accountTable.getUserByEmail(email);
        if (userDataByEmail.length > 0 && userDataByEmail[0].id != account_id) {
            return res.status(500).json({ message: 'Email đã tồn tại' });
        }

        await accountTable.updateUserInfo({id: account_id, full_name, email});
        return res.status(200).json({ message: 'Update successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: 'Failed to update' });
    }
});

module.exports = router;