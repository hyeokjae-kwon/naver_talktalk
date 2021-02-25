var express = require('express');
var router = express.Router();

// 6. 발송 계정
var accountService = require('./AccountService');

router.get('/reg', accountService.accountReg);     // 6.1 발송계정 등록
router.get('/find', accountService.accountFind);   // 6.2 발송계정상세 조회

module.exports = router;