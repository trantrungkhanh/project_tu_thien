const express = require('express');
const router = express.Router();
const charityTable = require('../../database/modules/charity');
const authenApi = require('../services/Authen');
require('dotenv').config();
const multer = require('multer');
const path = require('path');


router.post('/', async (req, res) => {

    const { status , charity_id} = req.body;
    await charityTable.updateStatusCharity(status, charity_id)

    return res.json({
        code: 200
    });
});

module.exports = router;