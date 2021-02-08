var apiModule = require('./apiCall');
var talkModule = require('../talk/TalkService');
var logModule = require('../talk/TalkLogService');

const AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
const PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';   // dev

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
var devTestTempRegPath = '/' + AGENT_KEY + '/template' + '/' + PARTNER_KEY_DEV;

// 테스트 메시지 발송
function TestSend() {
    this.testSend = function(sendList) {
        
        var params = {
                    "인증번호" : "112233"
                    };
       console.log(sendList);
        var devTestSendData = {
                            "messageKey": sendList.talk_ord_no
                            , "phoneNumber": sendList.recv_no
                            , "templateCode": sendList.tmpl_cd
                            , "message" : sendList.talk_msg
                            , "userName": "권혁재"
                            //, "templateParams" : params
                            };
        var devTestSendPath = '/' + PARTNER_KEY_DEV + '/send';
        
        // 개발
        apiModule.apicalldev(devTestSendPath, devTestSendData, function(status, res) {
            console.log('======apiModule.apicalldev======');
            console.log('======status : ' + status);
            console.log('======res : ' + res);
            
            if(status == '200') {
                // 진짜 성공은 res.success == true
                console.log('api발송 완료');
                talkModule.updateTalkList(res, sendList);
            }

        });
    }
}

module.exports = new TestSend();