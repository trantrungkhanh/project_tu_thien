const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { campaignId, content } = req.body;
    await campaignTable.saveCampaignNews({campaign_id: campaignId, content_1: content}) 
    return res.json({
        code: 200
    });
});

module.exports = router;