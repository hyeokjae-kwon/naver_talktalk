/* express 모듈 */
var express = require('express');
var app = express();

// body-parser 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// router 폴더에 있는 js 파일을 쓰도록 변경
var router = require('./router/index');
app.use('/', router);

var talkService = require('./router/talk/TalkService');
var cron = require('node-cron');
cron.schedule('*/5 * * * * *', function() {
    console.log('*****cron_scheduler_start');
    talkService.sendNaverTalk();
    console.log('cron_scheduler_end*****');
});

// port 연결
app.listen(3000, function() {
    console.log("Start!! express server on port 3000");  
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(router);