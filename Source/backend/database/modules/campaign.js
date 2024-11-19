// campaign table
// campaign news table
// campaign img table
// campaign rating
const mysql = require('../mysql'); // Kết nối đến DB của bạn

module.exports = {
    // Lưu thông tin người dùng sau khi OTP hợp lệ
    async saveCampaign(campaignInfo) {
        const created_at = new Date(Date.now())
        const result = await mysql.execSql('INSERT INTO campaign (name, location, address, budget_requirement, budget, status, started_at, ended_at, created_at, description, charity_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [campaignInfo.name, campaignInfo.location, campaignInfo.address, campaignInfo.budget_requirement,
                0, 0, campaignInfo.started_at, campaignInfo.ended_at, created_at, campaignInfo.description, campaignInfo.charity_id
            ]);
        return result.insertId
    },

    async updateCampaign(campaignInfo) {
        const updated_at = new Date(Date.now())
        await mysql.execSql('UPDATE campaign SET name = ?, location = ?, address = ?, budget_requirement = ?, description = ?, started_at = ?, created_at = ?, updated_at = ? where id = ?',
            [campaignInfo.name, campaignInfo.location, campaignInfo.address, campaignInfo.budget_requirement, campaignInfo.description,
            campaignInfo.started_at, campaignInfo.ended_at, updated_at, campaignInfo.campaign_id
            ]);
    },

    async deleteCampaign(campaignId) {
        const deleted_at = new Date(Date.now())
        await mysql.execSql('UPDATE campaign SET deleted_at = ?, status = 3 where id = ?',
            [deleted_at, campaignId]);
    },

    async saveCampaignImg(campaignImgInfo) {
        const created_at = new Date(Date.now())
        await mysql.execSql('INSERT INTO campaign_img (campaign_id, path, created_at) VALUES (?, ?, ?)',
            [campaignImgInfo.campaign_id, campaignImgInfo.path, created_at
            ]);
    },

    async saveCampaignNews(campaignNewsInfo) {
        const created_at = new Date(Date.now())
        await mysql.execSql('INSERT INTO campaign_news (campaign_id, content_1, created_at) VALUES (?, ?, ?)',
            [campaignNewsInfo.campaign_id, campaignNewsInfo.content_1, created_at
            ]);
    },

    async saveCampaignRating(campaignRatingInfo) {
        const created_at = new Date(Date.now())
        await mysql.execSql('INSERT INTO campaign_rating (account_id, campaign_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)',
            [campaignRatingInfo.account_id, campaignRatingInfo.campaign_id, campaignRatingInfo.rating, campaignRatingInfo.comment, created_at
            ]);
    },

    async getCampaignByCharityId(charityId) {
        results = await mysql.execSql('SELECT * FROM campaign WHERE charity_id = ? AND deleted_at is null order by created_at desc', [charityId]);
        return results;
    },

    async getCampaign(campaignId) {
        results = await mysql.execSql('SELECT campaign.*, charity.name as charity_name, charity.bank, charity.bank_account, charity.momo_account FROM campaign LEFT JOIN charity on campaign.charity_id = charity.id WHERE campaign.id = ?', [campaignId]);
        return results[0];
    },

    async getCampaignImg(campaignId) {
        results = await mysql.execSql('SELECT * FROM campaign_img WHERE campaign_id = ?', [campaignId]);
        return results;
    },

    async getCampaignNews(campaignId) {
        results = await mysql.execSql('SELECT * FROM campaign_news WHERE campaign_id = ?', [campaignId]);
        return results;
    },

    async getCampaignRating(campaignId) {
        results = await mysql.execSql('SELECT campaign_rating.*, account.username FROM campaign_rating LEFT JOIN account ON campaign_rating.account_id = account.id WHERE campaign_rating.campaign_id = ?', [campaignId]);
        return results;
    },

    async getAllCampaignAdmin() {
        results = await mysql.execSql('SELECT campaign.*, charity.name as charity_name FROM campaign LEFT JOIN charity ON campaign.charity_id = charity.id order by campaign.status asc, campaign.created_at desc');
        return results;
    },
    
    async updateBudgetById(budget, id) {
        const updated_at = new Date(Date.now());
        await mysql.execSql('UPDATE campaign SET budget = ?, updated_at = ? where id = ?',[budget, updated_at, id]);
        return;
    }

};
