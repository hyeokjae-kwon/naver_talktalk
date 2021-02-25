var dbConn = require('../../config/maria');

var apiCall = require('../ApiCallService');

var AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
var PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';   // dev
var TEMPLATE_CODE = 'AT_20210225092930';        // dev_sample

function TemplateService() {
    this.templateReg = function(req, res, next) {
        // 3.1 템플릿 등록
        // url : /v1/{agentKey}/template/{partnerId}
        var apiPath = AGENT_KEY + '/template/' + PARTNER_KEY_DEV;
        var data = req.body;

        apiCall.apiCallPostDev(apiPath, data, function(result) {
            console.log(result);
        });
    },
    this.templateFind = function(req, res, next) {
        // 3.3 템플릿 조회
        // url : /v1/{agentKey}/template/{partnerKey}/{templateCode}
        var apiPath = AGENT_KEY + '/template/' + PARTNER_KEY_DEV + '/' + TEMPLATE_CODE;
        var data = {};

        apiCall.apiCallGetDev(apiPath, data, function(result) {
            console.log(result);
        });
    }
}

module.exports = new TemplateService();