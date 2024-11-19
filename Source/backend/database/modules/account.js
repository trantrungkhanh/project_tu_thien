// account table
const mysql = require('../mysql'); // Kết nối đến DB của bạn

// Lưu thông tin người dùng sau khi OTP hợp lệ
async function saveUser(userInfo) {
    const created_at = new Date(Date.now())
    const result = await mysql.execSql('INSERT INTO account (username, full_name, role, password, phone, created_at, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
         [userInfo.username, userInfo.name, userInfo.role, userInfo.passwordHash, userInfo.phoneNumberWithCountryCode, created_at, userInfo.email]);
    return result.insertId
}

async function updatePassword(password, email) {
    const updated_at = new Date(Date.now())
    await mysql.execSql('UPDATE account SET password = ?, updated_at = ? where email = ?',
        [password, updated_at, email]);
}

async function updateUserInfo(userInfo) {
    const updated_at = new Date(Date.now())
    await mysql.execSql('UPDATE account SET full_name = ?, email = ?, updated_at = ? where id = ?',
        [userInfo.full_name, userInfo.email, updated_at, userInfo.id]);
}

async function updatePasswordByAccountId(password, account_id) {
    const updated_at = new Date(Date.now())
    await mysql.execSql('UPDATE account SET password = ?, updated_at = ? where id = ?',
        [password, updated_at, account_id]);
}

async function getUser(username) {
    results = await mysql.execSql('SELECT * FROM account WHERE username = ?', [username]);
    return results;
}

async function getUserByEmail(email) {
    results = await mysql.execSql('SELECT * FROM account WHERE email = ?', [email]);
    return results;
}

async function getUserByPhone(phone) {
    results = await mysql.execSql('SELECT * FROM account WHERE phone = ?', [phone]);
    return results;
}

async function getUserByAccountId(accountId) {
    results = await mysql.execSql('SELECT * FROM account WHERE id = ?', [accountId]);
    return results;
}

async function getAllUser() {
    results = await mysql.execSql('SELECT * FROM account order by deleted_at asc, created_at desc');
    return results;
}

async function deleteAccount(account_id) {
    const deleted_at = new Date(Date.now());
    await mysql.execSql('UPDATE account SET deleted_at = ? where id = ?', [deleted_at, account_id])
}


module.exports = { saveUser, getUser, getAllUser, updatePassword, getUserByAccountId, updatePasswordByAccountId, updateUserInfo, deleteAccount, getUserByEmail, getUserByPhone};
