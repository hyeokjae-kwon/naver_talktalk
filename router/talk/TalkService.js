var dbConn = require('../../config/maria');
var testCall = require('../apicall/testCall');

// mybatis-mapper 연결
var talkMapper = require('mybatis-mapper');
talkMapper.createMapper(['././mapper/TalkMapper.xml']);

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
                        /*
                        var sendList = JSON.parse(result);
                        console.log(sendList);
                        console.log(sendList.msg_cont);
                        */
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
}

module.exports = new TalkService();