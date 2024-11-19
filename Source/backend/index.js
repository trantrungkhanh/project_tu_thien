const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('./database/mysql')
const routes = require('./modules/routes');
const cron = require('node-cron');

const app = express();

app.use(cors()); // Thêm dòng này để bật CORS
app.use(express.json());

mysql.setup()
// Đăng ký các route
for (const [path, router] of Object.entries(routes)) {
    app.use(path, router);
}

cron.schedule('* * * * *', () => {
    console.log('Chạy một tác vụ mỗi phút');
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
