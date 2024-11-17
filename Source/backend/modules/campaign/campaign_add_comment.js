const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const authenApi = require('../services/Authen');
require('dotenv').config();

router.post('/',  async (req, res) => {

    const {account_id, campaign_id, rating, comment} = req.body

    const token = req.headers['authorization'];
    const isAuth = await authenApi(token);
    if (!isAuth.result || isAuth.user.id != account_id) {
        return res.json({
            message: 'Không có quyền',
            code: 403,
        });
    }

    // find charity by account_id
    await campaignTable.saveCampaignRating({account_id, campaign_id, rating, comment});
    return res.json({
        code: 200
    });
});

module.exports = router;