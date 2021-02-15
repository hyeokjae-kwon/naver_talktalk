var dbConn = require('../config/maria');

// mybatis-mapper 연결
var talkMapper = require('mybatis-mapper');
talkMapper.createMapper(['./mapper/TalkMapper.xml']);

//질의문 형식
var format = {language: 'sql', indent: '  '};

module.exports = function () {
  return {
    insert: function(param, callback) {
      dbConn.getConnection(function(conn) {
        var param = {
            clientSeq : 12
        };

        var query = talkMapper.getStatement('TalkMapper', 'selectTalkList', param, format);
        
        conn.query(query)
                .then((result) => {
                    console.log('result code : ' + 200);
                    // var sendList = result[0];
                    // testCall.testSend(sendList);
                })
                .then((res) => {
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
      });  
    },
    update: function(param, callback) {
      dbConn.getConnection(function(conn) {
        var param = logList;

        param.talk_send_cd = apiResult.resultCode;
        param.serv_send_flag = 'S';
        
        var query = talkMapper.getStatement('TalkMapper', 'updateTalkList', param, format);

        conn.query(query)
                .then((result) => {
                    console.log('result code 1 : ' + 200);
                    var param = result[0];
                })
                .then((res) => {
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                });
      });
    },
    dbConn: dbConn
  }
}