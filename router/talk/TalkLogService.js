var dbConn = require('../../config/maria');

// mybatis-mapper 연결
var talkLogMapper = require('mybatis-mapper');
talkLogMapper.createMapper(['././mapper/TalkLogMapper.xml']);

function TalkLogService() {
    
    this.insertTalkLogList = function(apiResult, logList) {
        dbConn.getConnection(function(conn) {
            var param = logList;

            //param.talkResult = apiResult.resultCode;
            param.talk_result = '0000';
            console.log(param);
    
            var format = {language: 'sql'};
            var query = talkLogMapper.getStatement('TalkLogMapper', 'insertTalkLogList', param, format);
            console.log('check point 3=========');
            console.log(query);

            conn.query(query)
                    .then((result) => {
                        console.log('result code : ' + 200);
                        var param = result[0];
                        console.log('check point 4=========');
                        this.deleteTalkList(logList);
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
    };

    this.deleteTalkList = function(logList) {
        dbConn.getConnection(function(conn) {
            var param = {
                msgSeq : logList.msgSeq
            };
    
            var format = {language: 'sql'};
            var query = talkLogMapper.getStatement('TalkLogMapper', 'deleteTalkList', param, format);
            console.log('check point 5=========');
            conn.query(query)
                    .then((result) => {
                        console.log('result code : ' + 200);
                        
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

module.exports = new TalkLogService();
