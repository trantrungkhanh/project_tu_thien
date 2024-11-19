const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const donationTable = require('../../database/modules/donation');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { campaignId, content } = req.body;
    const campaign = await campaignTable.getCampaign(campaignId);

    await campaignTable.saveCampaignNews({ campaign_id: campaignId, content_1: content })
    const listDonate = await donationTable.getDonationByCampaignId(campaignId)
    if (listDonate.length > 0) {
        const recipients = listDonate.map(account => account.email)
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
            to: recipients.join(','),
            subject: "Thông báo mới từ TuThien.Com",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">

                <p>Tình hình chiến dịch "<strong>${campaign.name}</strong>" đã được cập nhật.</p>
                <p>Truy cập <a href="http://127.0.0.1:3000/campaign-detail/${campaignId}" style="color: #4CAF50;">TuThien.com</a> để xem chi tiết.</p>
            </div>
            `
        };
        await transporter.sendMail(mailOptions);
    }
    return res.json({
        code: 200
    });
});

module.exports = router;