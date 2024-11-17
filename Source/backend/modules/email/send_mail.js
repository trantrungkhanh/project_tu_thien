const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const accountTable = require('../../database/modules/account'); // Đường dẫn đến file db.js
const generateRandomString = require('../services/Utils');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { to } = req.body;

    const newPassword = generateRandomString(16)
    const newPasswordHash = bcrypt.hashSync(newPassword, 8)

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'tran666999@gmail.com', 
            pass: 'clwl liqw ufqi ubvo'  
        }
    });

    // Cấu hình email
    let mailOptions = {
        from: 'tran666999@gmail.com',
        to: to,
        subject: "Đặt lại mật khẩu TuThien.Com",
        text: `Mật khẩu mới của bạn là: ${newPassword}`
    };

    // Gửi email
    try {
        await transporter.sendMail(mailOptions);
        await accountTable.updatePassword(newPasswordHash, to);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: 'Failed to send email' });
    }
});

module.exports = router;