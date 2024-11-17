const express = require('express');
const router = express.Router();
const accountTable = require('../../database/modules/account'); // Đường dẫn đến file db.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/', async(req, res) => {
    const { accountId } = req.body;
    // Tìm người dùn
    userData = await accountTable.getUserByAccountId(accountId);
    if (userData.length === 0) {
        return res.status(200).json({ message: 'Tài khoản không tồn tại' , code: 403});
    }
    const user = userData[0];

    return res.json({
        code: 200,
        user_info: user
    });
});

module.exports = router;