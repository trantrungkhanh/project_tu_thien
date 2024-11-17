const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign'); 
require('dotenv').config();

router.post('/', async (req, res) => {
    const campaignList = await campaignTable.getAllCampaignAdmin();

    return res.json({
        code: 200,
        data: {campaign_list: campaignList}
    });
});

module.exports = router;