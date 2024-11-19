const express = require('express');
const router = express.Router();
const charityTable = require('../../database/modules/charity');
const authenApi = require('../services/Authen');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');


router.post('/', async (req, res) => {

    const { status, charity_id } = req.body;
    const charity = await charityTable.getCharityById(charity_id);

    await charityTable.updateStatusCharity(status, charity_id)

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
        to: charity[0].email,
        subject: "Thông báo mới từ TuThien.Com",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Tổ chức từ thiện của bạn "<strong>${charity[0].name}</strong>" đã được cập nhật trạng thái.</p>
            <p>Truy cập <a href="http://127.0.0.1:3000/" style="color: #4CAF50;">TuThien.com</a> để xem chi tiết.</p>
        </div>
        `
    };
    await transporter.sendMail(mailOptions);
    return res.json({
        code: 200
    });
});

module.exports = router;