var express = require('express');
var router = express.Router();

var templateService  = require('./TemplateService');

// url 연결(spring controller 역할)
router.get('/reg', templateService.templateReg)

module.exports = router;