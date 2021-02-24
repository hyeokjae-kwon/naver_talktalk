var apiModule = require('../apiCall');
var sql = require('../sql')();
var moment = require('moment');
const async = require('async');
var axios = require('axios');
// AWS SQS 연결
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'ap-northeast-2'});
AWS.config.loadFromPath('./config/awsConfig.json')

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.ap-northeast-2.amazonaws.com/634763629386/byyun-ustratalk-queue";
var params = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

var AGENT_KEY = 'FxRhny8GSoSOCufs6Bfa';
var PARTNER_KEY_DEV = 'fAO8bJKWQfuMwjNhSYXS';   // dev

var url = "https://dev2-biztalk-api.talk.naver.com/v1/";

var config = {
                headers: { "content-type": "application/json", "Authorization" : "FxRhny8GSoSOCufs6Bfa" },
            }

const sendNaver = ({ messageKey, receivers, message, templateCode, clientKey }) => {
    console.log('************************sendNaver');
    var sendData = {
        "messageKey": messageKey
        , "userName": "테스트" 
        , "phoneNumber" : receivers
        , "templateCode" : templateCode
        , "message" : message
        };

    var sendPath = url + clientKey + '/send';

    return axios.post(sendPath, sendData, config
    ).then((res) => res.data).catch(err => {
        console.log('err', err);
    });

    /*
    // 개발
    apiModule.apicalldev(sendPath, sendData, function(status, res) {
        console.log('======apiModule.apicalldev======');
        console.log('======status : ' + status);
        console.log('======res : ' + res);
        
        if(status == '200') {
            // 진짜 성공은 res.success == true
            console.log('api발송 완료');
            //talkModule.updateTalkList(res, sendList);            
        }
    });
    */
}

var receiveMsg = function(callback){
    console.log('****************receiveMsg');
    sqs.receiveMessage(params, function(err, data) {
      if (err) 
        return callback(err);
      if(data.Messages == undefined) 
        return;
        
      result = data.Messages;
      
      callback(null, data.Messages);
  })
}

var deleteMsg = async function(){
    console.log('****************deleteMsg');
    if(sqsReqId != undefined || sqsReqId != null) {
        var deleteParams = {
                            QueueUrl: queueURL,
                            ReceiptHandle: sqsReqId
                            };
      
        await sqs.deleteMessage(deleteParams, function(err, data) {
            if (err) {
                console.log("Delete Error", err);
            } else {
                console.log("Message Deleted", data);
                sqsReqId = null;
            }
        });
    }  
}

function nvl(str, defaultStr) {

    if(typeof str == "undefined" || str == null || str == "")
        str = defaultStr ;
     
    return str ;
}

var naverSend = async function() {
    console.log('****************naverSend');
    if(result.length >= 0) {
        for(i=0;i < result.length;i++) {           
            sendData = JSON.parse(result[i].Body);
            var msgKey = moment().format('YYYYMMDDHHmmss')+'-'+sendData.agentMsgSeq;
            var sendDate = moment().format('YYYY-MM-DD HH:mm:ss');
            await sendNaver({ messageKey: msgKey, receivers: sendData.recvNoE164, message: sendData.talkMsg, templateCode : sendData.tmplCd, clientKey : 'fAO8bJKWQfuMwjNhSYXS'  }).then((naverResult) => {
                sendData.talkOrdNo = nvl(naverResult.transmissionId,'');
                sendData.talkSendCd = naverResult.resultCode;
                sendData.msgSendCd = null;
                sendData.servSendFlag = 'E';
                sendData.servSendDt = sendDate;
                sendData.imgSendDt = null;
                sendData.servThreadId = 'nodeThreadId';
                insData.push(sendData);
                sendData = null;
                sqsReqId = result[i].ReceiptHandle
            });
            
            await dbIns();
            await deleteMsg(sqsReqId);
        };
        result = null;
    }
}

var dbIns = async function() {
    
    var param = {
        list : insData
    }
    
    await sql.insert(param, function(err, data) {
        if(err) 
            console.log(err);
        else 
            console.log(data);
    });

    insData=[];
}

let insData = [];
let sendData, result, sqsReqId;

function talkService() {
    this.sendNaverTalk = function() {
        if(result == null) {
            async.waterfall([
                receiveMsg,
                naverSend
            ], function(err, result) {
                if(err) 
                    console.log(err);
                else 
                    console.log('*******schedule end*******', result);
            });
        }
    }
}

module.exports = new talkService();