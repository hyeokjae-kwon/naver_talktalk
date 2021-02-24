var express = require('express');
var router = express.Router();
var talk = require('./talk/TalkIndex');
var account  = require('./account/AccountIndex');
var template = require('./template/TemplateIndex');

// url 연결(spring controller 역할)
router.get('/talk', talk);
router.get('/account', account);
router.get('/template', template)

module.exports = router;