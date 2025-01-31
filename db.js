// db.js
const mysql = require('mysql2/promise');

async function connectToDb() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',  // Change this to your database host
        user: 'root',       // Change this to your DB username
        password: '',       // Change this to your DB password
        database: 'testafterhouse' // Change this to your DB name
    });
    return connection;
}

module.exports = { connectToDb };
