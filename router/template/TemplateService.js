var dbConn = require('../../config/maria');

var apiCall = require('../ApiCallService');

var AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
var PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';   // dev


function TemplateService() {
    this.templateReg = function(apiPath, data, callback) {
        // url : /v1/{agentKey}/template/{partnerId}
        var apiPath = '/'+ AGENT_KEY + '/template' + '/' + PARTNER_KEY_DEV;
        apiCall.apiCallPost(apiPath, data);
    }
}

module.exports = new TemplateService();
