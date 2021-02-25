var express = require('express');
var router = express.Router();

// 3. 템플릿
var templateService = require('./TemplateService');

router.post('/reg', templateService.templateReg);       // 3.1 템플릿 등록
router.get('/find', templateService.templateFind);     // 3.3 템플릿 조회

module.exports = router;