var dbConn = require('../../config/maria');

function TalkService() {
    this.getTalkList = function(request, response) {
        dbConn.getConnection(function(conn) {
            conn.query('SELECT * FROM tb_msg_talk_log')
                .then((result) => {
                    console.log(result);

                    var output = {};
                    var temp = [];
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