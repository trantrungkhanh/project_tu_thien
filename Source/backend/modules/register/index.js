// API đăng kí
const express = require('express');
const router = express.Router();
const accountTable = require('../../database/modules/account'); // Các hàm để tương tác với DB
const charityTable = require('../../database/modules/charity');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {

    const { name, username, role, password, phoneNumberWithCountryCode, email, charityName } = req.body;
    const passwordHash = bcrypt.hashSync(password, 8)

    try {
        userDataByUsername = await accountTable.getUser(username);
        if (userDataByUsername.length > 0) {
            return res.status(500).json({ message: 'Tên tài khoản đã tồn tại' });
        }

        userDataByEmail = await accountTable.getUserByEmail(email);
        if (userDataByEmail.length > 0) {
            return res.status(500).json({ message: 'Email tài khoản đã tồn tại' });
        }

        userDataByPhone = await accountTable.getUserByPhone(phoneNumberWithCountryCode);
        if (userDataByPhone.length > 0) {
            return res.status(500).json({ message: 'Số điện thoại tài khoản đã tồn tại' });
        }

        const accountId = await accountTable.saveUser({ name, username, role, passwordHash, phoneNumberWithCountryCode, email });
        if (role === 'charity') {
            await charityTable.saveCharity({ account_id: accountId, name: charityName, file: null, status: 0 })
        }
        
        res.status(200).json({ message: 'Tạo tài khoản thành công! Vui lòng đăng nhập' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo tài khoản không thành công', error });
    }
});

module.exports = router;