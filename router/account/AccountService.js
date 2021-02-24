var dbConn = require('../../config/maria');

var apiCall = require('../ApiCallService');

var AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
var PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';   // dev
var PARTNER_ID = 'rnjsgurwo817'

function AccountService() {
    //this.accountReg = function(apiPath, data, callback) {
    //this.accountReg = function() {     
    this.accountReg = (req, res, next) => {
        console.log('accountReg');
        // url : /v1/{agentKey}/partner/{partnerId}
        var apiPath = '/'+ AGENT_KEY + '/partner' + '/' + PARTNER_ID;
        console.log('******************accountReg');
        console.log(apiPath);
        //apiCall.apiCallPost(apiPath, data);

    }
}

module.exports = new AccountService();