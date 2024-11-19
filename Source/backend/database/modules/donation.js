// donation table
const mysql = require('../mysql'); // Kết nối đến DB của bạn

// Lưu thông tin người dùng sau khi OTP hợp lệ
async function saveDonation(donationInfo) {
    const created_at = new Date(Date.now())
    const result = await mysql.execSql('INSERT INTO donation (account_id, amount, campaign_id, transfer_type, status, created_at, full_name, address, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [donationInfo.account_id, donationInfo.amount, donationInfo.campaign_id, donationInfo.transfer_type, 0, created_at, donationInfo.full_name, donationInfo.address, donationInfo.city, donationInfo.state]);
    return result.insertId
}

async function getDonationByAccountId(accountId) {
    results = await mysql.execSql('SELECT donation.*, campaign.name as campaign_name, charity.name as charity_name FROM donation LEFT JOIN campaign ON donation.campaign_id = campaign.id LEFT JOIN charity ON campaign.charity_id = charity.id where donation.account_id = ?', [accountId]);
    return results;
}

async function getDonationByCampaignId(campaignId) {
    results = await mysql.execSql('SELECT donation.*, account.username, account.email FROM donation LEFT JOIN account ON account.id = donation.account_id where campaign_id = ?', [campaignId]);
    return results;
}

async function getAllDonateAdmin() {
    results = await mysql.execSql('SELECT donation.*, campaign.name as campaign_name, charity.name as charity_name, account.full_name as account_name FROM donation LEFT JOIN campaign ON donation.campaign_id = campaign.id LEFT JOIN charity ON campaign.charity_id = charity.id LEFT JOIN account ON donation.account_id = account.id order by donation.status asc, donation.created_at desc');
    return results;
}

async function updateDonateStatus(id, status) {
    const updated_at = new Date(Date.now())
    await mysql.execSql('UPDATE donation SET status = ?, updated_at = ? where id = ?', [status, updated_at, id]);
    return
}

async function getDonationById(id) {
    results = await mysql.execSql('SELECT donation.*, account.email FROM donation LEFT JOIN account on account.id = donation.account_id where donation.id = ?', [id]);
    return results;
}


module.exports = { saveDonation, getDonationByAccountId, getDonationByCampaignId, getAllDonateAdmin, updateDonateStatus, getDonationById };
