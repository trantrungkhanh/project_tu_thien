const express = require('express');
const router = express.Router();
const donationTable = require('../../database/modules/donation');
const authenApi = require('../services/Authen');
require('dotenv').config();

router.post('/', async (req, res) => {
    const token = req.headers['authorization'];
    
    const { account_id, campaign_id, transfer_type, status, fullName, address, city, state, amount } = req.body.donationInfo; 
    
    const isAuth = await authenApi(token);
    if (!isAuth.result || isAuth.user.id != account_id) {
        return res.json({
            message: 'Không có quyền',
            code: 403,
        });
    }

    const donationId = await donationTable.saveDonation({account_id, campaign_id, transfer_type, status, full_name: fullName, address, city, state, amount});

    return res.json({
        code: 200,
        data: {donation_id: donationId}
    });
});

module.exports = router;