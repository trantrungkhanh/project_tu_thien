const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const donationTable = require('../../database/modules/donation')
require('dotenv').config();

router.post('/', async (req, res) => {
    const campaignList = await campaignTable.getAllCampaignAdmin();
    const campaignListNew = []
    for (const campaign of campaignList) {
        const campaignImg = await campaignTable.getCampaignImg(campaign.id)
        const campaignNews = await campaignTable.getCampaignNews(campaign.id)
        const campaignRating = await campaignTable.getCampaignRating(campaign.id)
        const campaignDonation = await donationTable.getDonationByCampaignId(campaign.id)
        campaign["campaign_image"] = campaignImg ?? []
        campaign["campaign_news"] = campaignNews ?? []
        campaign["campaign_rating"] = campaignRating ?? []
        campaign["campaign_donation"] = campaignDonation ?? []
        campaignListNew.push(campaign)
    }


    return res.json({
        code: 200,
        data: { campaign_list: campaignList }
    });
});

module.exports = router;