var request = require('request');

var AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
//const PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';
const API_SERVER_DEV = 'https://dev2-biztalk-api.talk.naver.com';
const API_SERVER_PROD = 'https://biztalk-api.talk.naver.com';
const API_VERSION = '/v1';

const OPTIONS = {
    headers : {'Content-Type' : 'application/json', 'Authorization' : AGENT_KEY}
    , url : null
    , body : null
};

exports.apicall = function(apiPath, data, callback) {

    OPTIONS.url = API_SERVER_PROD + API_VERSION + apiPath;
    OPTIONS.body = JSON.stringify(data);

    // API 호출
    request.post(OPTIONS, function(err, res, result) {
        // 에러 핸들링
        statusCodeErrorHandler(res.statusCode, result);
    });

    // 에러 핸들링 함수
    function statusCodeErrorHandler(statusCode, result) {
        if(statusCode == '200' && result.success == true) {           
            // 호출 성공(true)
            console.log('API Status ' + statusCode);
            console.log('API호출에 성공하였습니다.');
        } else {
            console.log('API Status ' + statusCode);
            console.log('API호출에 실패하였습니다.');
            console.log(JSON.parse(result));

            result = false;
        }
        // callback 호출
        callback(result);
    }
}

exports.apicalldev = function(apiPath, data, callback) {

    OPTIONS.url = API_SERVER_DEV + API_VERSION + apiPath;
    OPTIONS.body = JSON.stringify(data);

    // API 호출
    request.post(OPTIONS, function(err, res, result) {
        // 에러 핸들링
        statusCodeErrorHandler(res.statusCode, result);
    });

    // 에러 핸들링 함수
    function statusCodeErrorHandler(statusCode, result) {
        if(statusCode == '200' && result.success == true) {           
            // 호출 성공(true)
            console.log('API Status ' + statusCode);
            console.log('API호출에 성공하였습니다.');
        } else {
            console.log('API Status ' + statusCode);
            console.log('API호출에 실패하였습니다.');
            console.log(JSON.parse(result));

            result = false;
        }
        // callback 호출
        callback(statusCode, result);
    }
}