const express = require('express');
const router = express.Router();
const accountTable = require('../../database/modules/account'); // Đường dẫn đến file db.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    // Tìm người dùn
    userData = await accountTable.getUser(username);
    if (userData.length === 0) {
        return res.status(200).json({ message: 'Tài khoản không tồn tại' , code: 403});
    }
    const user = userData[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(200).json({ message: 'Sai mật khẩu' , code: 403});
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
        expiresIn: '1h',
    });

    return res.json({
        token: token,
        code: 200,
        user_info: user
    });
});

module.exports = router;