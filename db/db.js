const mysql = require('mysql2/promise')

class db {

    connect = async () => {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });

        return connection
    }

    execute = async (query) => {

        const connection = await this.connect()
        const [results] = await connection.execute(query);
        connection.end()
        return results
    }
}

module.exports = new db()