const { createDbConnection } = require('./db')
const path = require('path')

module.exports = {
    connection: null,
    schemas: null,
    async setup() {
        this.connection = await createDbConnection()
    },

    async execSql(sql) {
        try {
        // Thực hiện câu lệnh SELECT
        const [results] = await this.connection.query(sql);
        return results; // Trả về các bản ghi dưới dạng mảng JSON
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}