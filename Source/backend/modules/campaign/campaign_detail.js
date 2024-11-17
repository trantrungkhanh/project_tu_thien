const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const donationTable = require('../../database/modules/donation')
require('dotenv').config();

router.post('/', async (req, res) => {
    const { campaignId } = req.body; 
    const campaign = await campaignTable.getCampaign(campaignId)
    const campaignImg = await campaignTable.getCampaignImg(campaignId)
    const campaignNews = await campaignTable.getCampaignNews(campaignId)
    const campaignRating = await campaignTable.getCampaignRating(campaignId)
    const campaignDonation = await donationTable.getDonationByCampaignId(campaignId)
    campaign["campaign_image"] = campaignImg ?? []
    campaign["campaign_news"] = campaignNews ?? []
    campaign["campaign_rating"] = campaignRating ?? []
    campaign["campaign_donation"] = campaignDonation ?? []

    return res.json({
        code: 200,
        data: {campaign: campaign}
    });
});

module.exports = router;