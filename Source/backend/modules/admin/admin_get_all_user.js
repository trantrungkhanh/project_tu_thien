const express = require('express');
const router = express.Router();
const accountTable = require('../../database/modules/account'); 
require('dotenv').config();

router.post('/', async (req, res) => {
    const accountList = await accountTable.getAllUser();

    return res.json({
        message: 'Đăng nhập thành công',
        code: 200,
        data: {account_list: accountList}
    });
});

module.exports = router;