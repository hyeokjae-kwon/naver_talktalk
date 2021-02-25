//var request = require('request');
var axios = require('axios');

const API_SERVER_DEV = 'https://dev2-biztalk-api.talk.naver.com/';
const API_SERVER_PROD = 'https://biztalk-api.talk.naver.com/';
const API_VERSION = 'v1/';
//const AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';

const config = {
    headers: { "content-type": "application/json", "Authorization" : "FxRhny8GSoSOCufs6Bfa" },
}

function ApiCallService() {
    this.apiCallPost = function(apiPath, data, callback) {
        // 운영 post
        var url = API_SERVER_PROD + API_VERSION + apiPath;

        return axios.post(url, data, config
            ).then((res) => {
                callback(res.data);
            }).catch(err => {
                console.log('err', err);
            });
    },
    this.apiCallGet = function(apiPath, data, callback) {
        // 운영 get
        var url = API_SERVER_PROD + API_VERSION + apiPath;

        return axios.get(url, data, config
            ).then((res) => {
                callback(res.data);
            }).catch(err => {
                console.log('err', err);
            });
    },
    this.apiCallPostDev = function(apiPath, data, callback) {
        // 개발 post
        var url = API_SERVER_DEV + API_VERSION + apiPath;

        return axios.post(url, data, config
            ).then((res) => {
                callback(res.data);
            }).catch(err => {
                console.log('err', err);
            });
    },
    this.apiCallGetDev = function(apiPath, data, callback) {
        // 개발 get
        var url = API_SERVER_DEV + API_VERSION + apiPath;

        return axios.get(url, data, config
            ).then((res) => {
                callback(res.data);
            }).catch(err => {
                console.log('err', err);
            });
    }
}

/*
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
*/

module.exports = new ApiCallService();