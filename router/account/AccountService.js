var dbConn = require('../../config/maria');

var apiCall = require('../ApiCallService');

var AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
var PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';   // dev
var PARTNER_ID = 'rnjsgurwo817'

function AccountService() {
    this.accountReg = function(req, res, next) {
        // 6.1 발송계정등록
        // url : /v1/{agentKey}/partner/{partnerId}
        var apiPath = AGENT_KEY + '/partner/' + PARTNER_ID;
        var data = {};
        apiCall.apiCallPostDev(apiPath, data, function(result) {
            console.log(result);
        });
    },
    this.accountFind = function(req, res, next) {
        // 6.2 발송계정상세 조회
        // url : /v1/{agentKey}/partner/{partnerKey}
        //var apiPath = AGENT_KEY + '/partner/' + PARTNER_KEY;
        var apiPath = AGENT_KEY + '/partner/' + PARTNER_KEY_DEV;
        var data = {};
        apiCall.apiCallGetDev(apiPath, data, function(result) {
            console.log(result);
        });
    }
}

module.exports = new AccountService();