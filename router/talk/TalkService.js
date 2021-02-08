var dbConn = require('../../config/maria');
var testCall = require('../apicall/testCall');

// mybatis-mapper 연결
var talkMapper = require('mybatis-mapper');
talkMapper.createMapper(['././mapper/TalkMapper.xml']);

exports.getTalkList = function() {
    dbConn.getConnection(function(conn) {
        var param = {
            clientSeq : 12
        };

        var format = {language: 'sql'};
        var query = talkMapper.getStatement('TalkMapper', 'selectTalkList', param, format);
        
        conn.query(query)
                .then((result) => {
                    console.log('result code : ' + 200);
                    var sendList = result[0];
                    testCall.testSend(sendList);
                })
                .then((res) => {
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
    });  
}

exports.updateTalkList = function(apiResult, logList) {
    dbConn.getConnection(function(conn) {
        console.log('updateTalkList 실행');
        var param = logList;

        //param.talkResult = apiResult.resultCode;
        param.talk_send_cd = '0000';
        param.serv_send_flag = 'S';

        console.log(param);
        
        var query = talkLogMapper.getStatement('TalkMapper', 'updateTalkList', param, {language: 'sql', indent: '  '});
        console.log(query);

        conn.query(query)
                .then((result) => {
                    console.log('result code 1 : ' + 200);
                    var param = result[0];
                    console.log('check point 4=========');
                })
                .then((res) => {
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
    });    
}
/*
function TalkService() {
    this.getTalkList = function(request, response) {
        dbConn.getConnection(function(conn) {
            var param = {
                clientSeq : 12
            };
    
            var format = {language: 'sql'};
            var query = talkMapper.getStatement('TalkMapper', 'selectTalkList', param, format);
            
            conn.query(query)
                    .then((result) => {
                        console.log('result code : ' + 200);
                        var sendList = result[0];
                        testCall.testSend(sendList);
                    })
                    .then((res) => {
                        conn.end();
                    })
                    .catch(err => {
                        console.log(err);
                        conn.end();
                    });
        });        
    };

    this.updateTalkList = function(apiResult, logList) {
        dbConn.getConnection(function(conn) {
            var param = logList;

            //param.talkResult = apiResult.resultCode;
            param.talk_result = 'T-OK';
            param.msg_result = '';
            
            var query = talkLogMapper.getStatement('TalkMapper', 'updateTalkList', param, {language: 'sql', indent: '  '});
            console.log(query);

            conn.query(query)
                    .then((result) => {
                        console.log('result code 1 : ' + 200);
                        var param = result[0];
                        console.log('check point 4=========');
                    })
                    .then((res) => {
                        conn.end();
                    })
                    .catch(err => {
                        console.log(err);
                        conn.end();
                    });
        });        
    };
}
*/
//module.exports = new TalkService();