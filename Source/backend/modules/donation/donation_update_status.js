const express = require('express');
const router = express.Router();
const donationTable = require('../../database/modules/donation');
const campaignTable = require('../../database/modules/campaign.js')
const authenApi = require('../services/Authen');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { donate_id, status } = req.body; 
    const donateInfo = await donationTable.getDonationById(donate_id);
    const campaign = await campaignTable.getCampaign(donateInfo[0].campaign_id);
    const updatedValue = campaign.budget + donateInfo[0].amount;
    await donationTable.updateDonateStatus(donate_id, status);
    await campaignTable.updateBudgetById(updatedValue, campaign.id)
    return res.json({
        code: 200
    });
});

module.exports = router;