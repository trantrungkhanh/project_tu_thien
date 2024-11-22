const express = require('express');
const router = express.Router();
const campaignTable = require('../../database/modules/campaign');
const charityTable = require('../../database/modules/charity');
const authenApi = require('../services/Authen');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../frontend/public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Đổi tên file để tránh trùng lặp
    },
});

const upload = multer({ storage });

router.post('/', upload.array('files', 10), async (req, res) => {
    imagePaths = [];
    if (req.files !== undefined && req.files !== null) {
        imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    }
    // find charity by account_id
    const charity = await charityTable.getCharityByAccountId(req.body.account_id)
    if (charity[0]) {
        //insert campaign
        const charity_id = charity[0].id
        const { name, location, address, budget_requirement, description, started_at, ended_at } = req.body;
        const campaign_id = await campaignTable.saveCampaign({ name, location, address, budget_requirement, description, charity_id, started_at, ended_at});
        for (const path of imagePaths) {
            await campaignTable.saveCampaignImg({ campaign_id, path })
        }
    }



    return res.json({
        code: 200,
        data: { image_folder: imagePaths }
    });
});

module.exports = router;