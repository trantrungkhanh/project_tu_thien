const express = require('express');
const router = express.Router();
const donationTable = require('../../database/modules/donation');
const campaignTable = require('../../database/modules/campaign.js')
const authenApi = require('../services/Authen');
require('dotenv').config();
const nodemailer = require('nodemailer');


router.post('/', async (req, res) => {
    const { donate_id, status } = req.body; 
    const donateInfo = await donationTable.getDonationById(donate_id);
    const campaign = await campaignTable.getCampaign(donateInfo[0].campaign_id);
    const updatedValue = campaign.budget + donateInfo[0].amount;
    await donationTable.updateDonateStatus(donate_id, status);
    await campaignTable.updateBudgetById(updatedValue, campaign.id)

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
        to: donateInfo[0].email,
        subject: "Thông báo mới từ TuThien.Com",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Hóa đơn quyên góp cho chiến dịch "<strong>${campaign.name}</strong>" đã được cập nhật trạng thái.</p>
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