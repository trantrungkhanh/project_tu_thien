// API đăng nhập
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const charityTable = require('../../database/modules/charity');
const faqTable = require('../../database/modules/faq')
require('dotenv').config();

router.post('/', async (req, res) => {
    // find charity list
    const charityList = await charityTable.getAllCharity();
    const newCharityList = []
    if (charityList.length > 0) {
        for (const charity of charityList) {
            const campaignList = await campaignTable.getCampaignByCharityId(charity.id)
            if (campaignList.length > 0) {
                const newCampaignList = []
                for (const campaign of campaignList) {
                    const campaignImg = await campaignTable.getCampaignImg(campaign.id)
                    const campaignNews = await campaignTable.getCampaignNews(campaign.id)
                    const campaignRating = await campaignTable.getCampaignRating(campaign.id)
                    campaign["campaign_image"] = campaignImg ?? []
                    campaign["campaign_news"] = campaignNews ?? []
                    campaign["campaign_rating"] = campaignRating ?? []
                    newCampaignList.push(campaign)
                }
                charity["campaign_list"] = newCampaignList ?? [];
            } else {
                charity["campaign_list"] = [];
            }
            newCharityList.push(charity);
        };
    }

    //find faq
    const faqList = await faqTable.getAllFaq();


    // get news
    const { data } = await axios.get('https://nhandan.vn/ngap-lut-tag1663.html');
    const $ = cheerio.load(data);

    const articles = [];

    // Trích xuất thông tin từ các bài viết
    $('.story').each((i, element) => {
        const title = $(element).find('h3').text();
        const link = $(element).find('a').attr('href');
        const summary = $(element).find('.story__summary').text();
        const thumbnail = $(element).find('.story__thumb').find('a').find('img').attr('data-src');
        if (summary !== '' || summary) {
            articles.push({ title, link, summary, thumbnail});
        }
    });

    return res.json({
        code: 200,
        data: { charity_list: newCharityList, faq_list: faqList, articles: articles  }
    });
});

module.exports = router;