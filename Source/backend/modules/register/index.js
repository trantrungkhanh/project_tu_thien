// API đăng kí
const express = require('express');
const router = express.Router();
const { saveUser } = require('../../database/modules/account'); // Các hàm để tương tác với DB
const charityTable = require('../../database/modules/charity');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {

    const { name, username, role, password, phoneNumberWithCountryCode, email, charityName } = req.body;
    const passwordHash = bcrypt.hashSync(password, 8)
    
    try {
        const accountId = await saveUser({ name, username, role, passwordHash, phoneNumberWithCountryCode, email });
        await charityTable.saveCharity({account_id: accountId, name: charityName, file: null, status: 0})
        res.status(200).json({ message: 'Tạo tài khoản thành công! Vui lòng đăng nhập' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi tạo tài khoản không thành công', error });
    }
});  

module.exports = router;