var dbConn = require('../../config/maria');

//var bodyParser = require('body-parser');

var mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['../../mapper/TalkMapper.xml']);

function TalkService() {
    this.getTalkList = function(request, response) {
        dbConn.getConnection(function(conn) {
            
            var param = {
                testParam : 1
            };

            let format = {language: 'sql', indent: ' '};
            let query = mybatisMapper.getStatement('TalkMapper', 'selectTalkLogList', param, format);
            console.log(query);
            
            conn.query(query)
                .then((result) => {
                    console.log(result);

                    var output = {};
                    output.datas = result;

                    dbConn.sendJSON(response, 200, output);
                })
                .then((res) => {
                    console.log('res = ' + res);
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