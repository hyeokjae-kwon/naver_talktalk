var module = require('./apiCall');

var agent_key = 'FxRhny8GSoSOCufs6Bfa';
var partner_key = 'aooCDF7yTlu8LHteim52';

// 테스트 유저 등록
var devTestUserRegData = {
                        "cellphoneNumber": "821033655168"
                        , "naverId": "rnjsgurwo817"
                        };
var devTestUserRegPath = "/user";                   

// 테스트용 템플릿 등록
var devTestTempRegData = {
                        "code": "20200120DUFHEJF34"
                        , "text": "테스트 템플릿입니다."
                        , "categoryCode": "S001"
                        };
var devTestTempRegPath = '/' + agent_key + '/template' + '/' + partner_key;

// 테스트 메시지 발송
var devTestSendData = {
                    "messageKey": "20210125-000000001",
                    "phoneNumber": "821033655168",
                    "templateCode": "20200120DUFHEJF34",
                    "userName": "권혁재"
                    };
var devTestSendPath = '/' + partner_key + '/send';

module.apicall('dev', devTestTempRegData, devTestTempRegPath);