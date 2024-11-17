const express = require('express');
const router = express.Router();
const accountTable = require('../../database/modules/account'); 
require('dotenv').config();

router.post('/', async (req, res) => {
    await accountTable.deleteAccount(req.body.account_id);

    return res.json({
        code: 200
    });
});

module.exports = router;