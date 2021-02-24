var express = require('express');
var router = express.Router();

var accountService  = require('./AccountService');

// url 연결(spring controller 역할)
router.get('/reg', accountService.accountReg);

module.exports = router;