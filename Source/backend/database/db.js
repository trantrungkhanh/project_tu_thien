require('dotenv').config();
const mysql = require('mysql2/promise');

async function createDbConnection() {
  try {
    // Tạo kết nối đến MySQL
    const connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 100, // Giới hạn số lượng kết nối tối đa trong pool
      queueLimit: 0, // Không giới hạn số lượng yêu cầu chờ kết nối
      enableKeepAlive: true,
      keepAliveInitialDelay: 30000, // 30 giây để gửi keep-alive packet 
    });

    connection.on('error', async (err) => {
      if (err.code == 4103) {
        console.error('Mất kết nối, đang kết nối lại . . .');
        connection = await createDbConnection();
      } else {
        throw err;
      }
    })

    console.log('Đã kết nối đến MySQL');
    return connection;
  } catch (err) {
    console.error('Lỗi kết nối đến MySQL:', err);
    console.error('Đang kết nối lại . . .');
    setTimeout(createDbConnection, 2000)
    throw err;
  }
}



module.exports = {createDbConnection};
