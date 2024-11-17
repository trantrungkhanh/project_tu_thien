const express = require('express');
const router = express.Router();
const donateTable = require('../../database/modules/donation'); 
require('dotenv').config();

router.post('/', async (req, res) => {
    const donateList = await donateTable.getAllDonateAdmin();

    return res.json({
        code: 200,
        data: {donate_list: donateList}
    });
});

module.exports = router;