// charity table
const mysql = require('../mysql'); // Kết nối đến DB của bạn

// Lưu thông tin người dùng sau khi OTP hợp lệ
async function saveCharity(charityInfo) {
    const created_at = new Date(Date.now())
    await mysql.execSql('INSERT INTO charity (account_id, name, file, status, created_at) VALUES (?, ?, ?, ?, ?)',
        [charityInfo.account_id, charityInfo.name, charityInfo.file, charityInfo.status, created_at]);
}

async function updateCharity(charityInfo) {
    await mysql.execSql('UPDATE charity SET name= ?, bank = ?, bank_account = ?, momo_account = ?, file= ?, status = ? where id = ?',
        [charityInfo.name, charityInfo.bank, charityInfo.bankAccount, charityInfo.momoAccount, charityInfo.file, charityInfo.status, charityInfo.id]);
}

async function updateStatusCharity(status, id) {
    const updated_at = new Date(Date.now())
    await mysql.execSql('UPDATE charity SET status = ?, updated_at = ? where id = ?',
        [status, updated_at,id]);
}

async function getCharityById(charityId) {
    results = await mysql.execSql('SELECT charity.*, account.email FROM charity left join account on account.id = charity.account_id WHERE charity.id = ?', [charityId]);
    return results;
}

async function getAllCharity() {
    results = await mysql.execSql('SELECT * FROM charity where deleted_at IS NULL order by created_at desc');
    return results;
}

async function getAllCharityAdmin() {
    results = await mysql.execSql('SELECT charity.*, account.username, account.full_name FROM charity left join account on account.id = charity.account_id order by charity.status asc, charity.created_at desc');
    return results;
}

async function getCharityByAccountId(accountId) {
    results = await mysql.execSql('SELECT * FROM charity WHERE account_id = ?', [accountId]);
    return results;
}


module.exports = { saveCharity, getCharityById, getAllCharity, getAllCharityAdmin, getCharityByAccountId, updateCharity, updateStatusCharity};
