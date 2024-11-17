const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const authenApi = require('../services/Authen');
require('dotenv').config();

router.post('/', async (req, res) => {

    const { campaign_id } = req.body
    // find charity by account_id
    await campaignTable.deleteCampaign(campaign_id);
    return res.json({
        code: 200
    });
});

module.exports = router;