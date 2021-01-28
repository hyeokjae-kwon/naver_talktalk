/* express 모듈 */
var express = require('express');
var app = express();

// router 폴더에 있는 js 파일을 쓰도록 변경
var router = require('./router');
app.use('/', router);

// body-parser 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// DB 접속정보(mariaDB)
// var dbConn = require('./config/maria');
// var conn = dbConn.init();
//dbConn.getConnection();

// port 연결
app.listen(3000, function() {
    console.log("Start!! express server on port 3000");
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(router);