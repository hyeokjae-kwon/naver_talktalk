var module = require('./apiCall');

var agent_key = 'FxRhny8GSoSOCufs6Bfa';
var partner_key_dev = 'fAO8bJKWQfuMwjNhSYXS';   // dev

// 테스트 유저 등록
var devTestUserRegData = {
                        "cellphoneNumber": "821033655168"
                        , "naverId": "rnjsgurwo817"
                        };
var devTestUserRegPath = "/user";                   

// 테스트용 템플릿 등록
var devTestTempRegData = {
                        "code": "NT_202102010000001"
                        , "text": "인증번호는 #{인증번호} 입니다."
                        , "categoryCode": "S014"
                        };
var devTestTempRegPath = '/' + agent_key + '/template' + '/' + partner_key_dev;

// 테스트 메시지 발송
//{ success: true, templateId: 643 }
var devTestSendData = {
                    "messageKey": "20210125-000000001",
                    "phoneNumber": "821033655168",
                    "templateCode": "NT_202102010000001",
                    "userName": "권혁재"
                    };
var devTestSendPath = '/' + partner_key_dev + '/send';

module.apicall('dev', devTestTempRegPath, devTestTempRegData);