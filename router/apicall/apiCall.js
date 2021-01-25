var request = require('request');

const agent_key = 'FxRhny8GSoSOCufs6Bfa';
const api_server_dev = 'https://dev2-biztalk-api.talk.naver.com';
const api_server_prod = 'https://biztalk-api.talk.naver.com';
const api_version = '/v1';

const OPTIONS = {
    headers : {'Content-Type' : 'application/json', 'Authorization' : agent_key}
    , url : null
    , body : null
};

exports.apicall = function(serverPath ,api_path, data) {
    
    var api_server = api_server_prod;
    // 개발일 경우 개발 서버로 호출
    if(serverPath == 'dev') {
        api_server = api_server_dev;
    }

    OPTIONS.url = api_server + api_version + api_path;
    OPTIONS.body = JSON.stringify(data);

    // API 호출
    request.post(OPTIONS, function(err, res, result) {
        // 에러 핸들링
        statusCodeErrorHandler(res.statusCode, result);
    });

    // 에러 핸들링 함수
    function statusCodeErrorHandler(statusCode, result) {
        if(statusCode == '200') {           
            if(result.success == 'true') {
                // 호출 성공(true)
                console.log('API Status ' + statusCode);
                console.log('API호출에 성공하였습니다.');
            } else {
                // 호출 실패(false)
                console.log('API Status ' + statusCode);
                console.log('API호출에 실패하였습니다.');
                console.log(JSON.parse(result));
            }

        } else {
            console.log('API Status ' + statusCode);
            console.log('API호출에 실패하였습니다.');
            console.log(JSON.parse(result));
        }
    }
}