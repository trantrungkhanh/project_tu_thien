const express = require('express');
const router = express.Router();
const charityTable = require('../../database/modules/charity'); 
require('dotenv').config();

router.post('/', async (req, res) => {
    const charityList = await charityTable.getAllCharityAdmin();

    return res.json({
        code: 200,
        data: {charity_list: charityList}
    });
});

module.exports = router;