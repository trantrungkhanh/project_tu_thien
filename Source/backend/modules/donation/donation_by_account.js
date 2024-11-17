const express = require('express');
const router = express.Router();
const donationTable = require('../../database/modules/donation');
const authenApi = require('../services/Authen');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { accountId } = req.body; 
    const token = req.headers['authorization'];
    const isAuth = await authenApi(token);

    if (!isAuth.result || isAuth.user.id != accountId) {
        return res.json({
            message: 'Không có quyền',
            code: 403,
        });
    }
    const donationList = await donationTable.getDonationByAccountId(accountId);

    return res.json({
        code: 200,
        data: {donation_list: donationList}
    });
});

module.exports = router;