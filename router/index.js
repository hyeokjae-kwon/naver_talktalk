var express = require('express');
var router = express.Router();
var talkService = require('./TalkService');

// url 연결(spring controller 역할)
router.get('/send', talkService.getTalkList);

module.exports = router;