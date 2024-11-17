// faq table
const mysql = require('../mysql'); // Kết nối đến DB của bạn

// Lưu thông tin người dùng sau khi OTP hợp lệ
async function saveFaq(faqInfo) {
    const created_at = new Date(Date.now())
    await mysql.execSql('INSERT INTO faq (question, answer) VALUES (?, ?)',
        [faqInfo.question, faqInfo.answer]);
}

async function getAllFaq() {
    results = await mysql.execSql('SELECT * FROM faq');
    return results;
}


module.exports = { saveFaq, getAllFaq};
