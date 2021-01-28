var express = require('express');
var router = express.Router();

// router js 파일 추가시 이곳에서 등록
var main = require('./main');        // main 등록
var talk = require('./talk');           // talk 등록

router.use('/main', main);
router.use('/talk', talk);

module.exports = router;