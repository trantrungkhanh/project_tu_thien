const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const accountTable = require('../../database/modules/account'); // Đường dẫn đến file db.js
const generateRandomString = require('../services/Utils');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { account_id, password, old_password } = req.body;

    userData = await accountTable.getUserByAccountId(account_id);
    if (userData.length === 0) {
        return res.status(200).json({ message: 'Tài khoản không tồn tại' , code: 403});
    }
    const user = userData[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = bcrypt.compareSync(old_password, user.password);
    if (!isPasswordValid) {
        return res.status(500).json({ message: 'Mật khẩu hiện tại không chính xác' , code: 403});
    }
    
    const newPasswordHash = bcrypt.hashSync(password, 8)

    try {
        await accountTable.updatePasswordByAccountId(newPasswordHash, account_id);
        return res.status(200).json({ message: 'Update password successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: 'Failed to update password' });
    }
});

module.exports = router;