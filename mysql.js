const mysql = require('mysql2');
/* DB접속정보 등록 */
const connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'node_user',
    password : 'nodeuser1!',
    database : 'nodetest'
});

module.exports = connection;