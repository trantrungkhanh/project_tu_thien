const express = require('express');
const router = express.Router();
const charityTable = require('../../database/modules/charity');
const authenApi = require('../services/Authen');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../frontend/public/uploads/charity'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Đổi tên file để tránh trùng lặp
    },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    const token = req.headers['authorization'];
    const isAuth = await authenApi(token);
    if (!isAuth.result || isAuth.user.id != req.body.accountId) {
        return res.json({
            message: 'Không có quyền',
            code: 403,
        });
    }

    const { name , bank, bankAccount, momoAccount} = req.body;
    const charity = await charityTable.getCharityByAccountId(req.body.accountId)
    imagePath = charity[0].file;
    if (req.file !== undefined && req.file !== null) {
        imagePath = `/uploads/charity/${req.file.filename}`;
    }
    // find charity by account_id
    await charityTable.updateCharity({name, file: imagePath, id: charity[0].id, status: charity[0].status, bank, bankAccount, momoAccount})

    return res.json({
        code: 200
    });
});

module.exports = router;