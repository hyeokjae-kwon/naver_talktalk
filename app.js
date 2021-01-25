/* DB 접속정보 */
var maria = require('./maria.js');
var dbConfig = require('./config/dbConfig');
/* express 모듈 */
var express = require('express');
var app = express();

/* mysqlDB 연결 */
// const mysql = require('./mysql.js');
// mysql.connect();

/* mariaDB 연결 */
maria.connect();

var router = require('./router/index');

/* port info */ 
app.listen(3000, function() {
    console.log("Start!! express server on port 3000");
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(router);