const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const charityTable = require('../../database/modules/charity');
require('dotenv').config();

router.post('/', async (req, res) => {
    // find charity by account_id
    const { name, location, address, budget_requirement, description, started_at, ended_at, campaign_id } = req.body;
    await campaignTable.updateCampaign({ name, location, address, budget_requirement, description, started_at, ended_at, campaign_id});
    return res.json({
        code: 200,
    });
});

module.exports = router;