const mariadb = require('mariadb');
var config = require('./dbConfig');

// DB접속
const pool = mariadb.createPool({
    host : config.host
    , port : config.port
    , user : config.user
    , password : config.password
    , database : config.database
});
/*
module.exports = {
    init: function() {
        return mariadb.createPool(dbInfo);
    },
    connect: function(conn) {
        conn.getConnection(function(err) {
            if(err) {
                console.error('mysql connection error : ' + err);
            } else {
                console.log('mysql is connected successfully!');
            }
        });
    }
}
*/

function dbConnect() {
    this.getConnection = function(callback) {
        pool.getConnection()
            .then(conn => {
                callback(conn);
            }).catch(err => {

            });
    }
    // 비동기방식 connection
    this.getConnectionAsync = async function() {
        try {
            let conn = await pool.getConnection();
            return conn;
        } catch(err) {
            throw err;
        }
        return null;
    }

    this.sendJSON = function(response, httpCode, body) {
        var result = JSON.stringify(body);
        // response.send(httpCode, result);
        // response.writeHead(httpCode, {'Content-Type' : 'text/html; charset=utf-8'});
        // response.end(result);
        console.log('result code : ' + httpCode);
        console.log(result);
    }
}

module.exports = new dbConnect();