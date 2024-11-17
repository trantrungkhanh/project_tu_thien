const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const charityTable = require('../../database/modules/charity');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { account_id } = req.body;
    const charity = await charityTable.getCharityByAccountId(account_id)
    const listCampaign = [];
    if (charity[0]) {
        const campaigns = await campaignTable.getCampaignByCharityId(charity[0].id)
        for (const campaign of campaigns) {
            const campaignNews = await campaignTable.getCampaignNews(campaign.id)
            campaign["campaign_news"] = campaignNews
            listCampaign.push(campaign)
        }
    }
    return res.json({
        code: 200,
        data: { campaigns: listCampaign }
    });
});

module.exports = router;