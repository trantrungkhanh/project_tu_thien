// API đăng nhập
const express = require('express');
const router = express.Router();
const mysql = require('../../database/mysql'); // Đường dẫn đến file db.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'secret123'; // Đặt một SECRET_KEY bảo mật

// Giả lập database với một người dùng
const users = [
    {
        id: 1,
        email: 'trung.khanh@gmail.com',
        password: bcrypt.hashSync('password', 8), // Mã hóa mật khẩu
    }
];

router.post('/', async(req, res) => {
    const { email, password } = req.body;
    // Tìm người dùng
    const query = `SELECT * FROM account WHERE username = '${email}'`;
    console.log(query)
    userData = await mysql.execSql(query);
    if (userData.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }
    const user = userData[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h',
    });

    return res.json({
        message: 'Login successful',
        token: token,
    });
});

module.exports = router;