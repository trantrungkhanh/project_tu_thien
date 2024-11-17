const express = require('express');
const router = express.Router();
const charityTable = require('../../database/modules/charity');
require('dotenv').config();

router.post('/', async (req, res) => {
    const charity = await charityTable.getCharityByAccountId(req.body.accountId)

    return res.json({
        code: 200,
        data: {charity: charity}
    });
});

module.exports = router;