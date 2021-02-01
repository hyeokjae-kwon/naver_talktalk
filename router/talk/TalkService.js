var dbConn = require('../../config/maria');

// mybatis-mapper 연결
var mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['././mapper/TalkMapper.xml']);

function TalkService() {
    this.getTalkList = function(request, response) {
        dbConn.getConnection(function(conn) {
            var param = {
                clientSeq : 31
            };
    
            let format = {language: 'sql'};
            let query = mybatisMapper.getStatement('TalkMapper', 'selectTalkLogList', param, format);
            
            conn.query(query)
                    .then((result) => {
                        console.log('result code : ' + 200);
                        console.log(JSON.stringify(result));
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