const express = require('express');
const router = express.Router();

const talk = require('./talk/TalkIndex');
const account  = require('./account/AccountIndex');
const template = require('./template/TemplateIndex');

// url 연결(spring controller 역할)
router.use('/talk', talk);
router.use('/account', account);
router.use('/template', template);

module.exports = router;