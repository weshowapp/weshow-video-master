'use strict';

import Base from './base.js';

var fs = require('fs');
var https = require('https');
var util = require('util');
var path = require('path');

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let l = await this.model('wxpay').limit(30).select();

    return this.success({
      list: l
    });

  }

  async notifyAction() {
    /*var http = require('http');
    var server = http.createServer(function(req,res){
    if(req.url!=="/favicon.ico"){
      req.on('data',function(data){
        console.log("RECEIVED:　"+decodeURIComponent(data));
      });
      req.on("end",function(){
        console.log('客户端请求数据全部接收完毕');
      });
    }
    res.end();
  });*/

    //let return_code = this.post('return_code');
    //let return_msg = this.post('return_msg');
    var headerMsg = this.header();
    var getMsg = this.get();
    var postMsg = this.post();
    console.log(headerMsg);
    //console.log(getMsg);
    //console.log(postMsg);
    //var msg = 'msg-' + getMsg + '-' + postMsg;
    var tm = this.getCurrentTime();
    //console.log(msg);

    let addResult = await this.model('wxpay').add({
      //notify: msg,
      notify: headerMsg,
      //note: postMsg,
      add_time: tm
    });

    return this.success({
      result: 'OK',
      notify: addResult,
      errorCode: 0
    });
  }

  async mmtransferAction() {
    console.log('mmtransferAction');
  
    var amount = this.post('amount');
    var body = 'QuestionPaltform';//商户名
    var check_name = 'FORCE_CHECK';
    var desc = '红包';
    var mch_appid = this.post('mch_appid');
    var mchid = '1497874882';//商户号
    var nonce_str = this.post('nonce_str');
    var notify_url = this.post('notify_url');//通知地址
    var openid = this.post('openid');
    var partner_trade_no = this.post('partner_trade_no');
    var re_user_name = this.post('re_user_name');
    var sign_type = 'MD5';
    var spbill_create_ip = '192.168.0.1';
    //var key = this.post('key');
    var sign = this.post('sign');
    //var unifiedPayment = 'amount=' + amount + '&body=' + body + '&check_name=' + check_name
    //  + '&desc=' + desc + '&mch_appid=' + mch_appid + '&mchid=' + mchid
    //  + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid
    //  + '&partner_trade_no=' + tradeNumber + '&re_user_name=' + re_user_name + '&sign_type=' + sign_type
    //  + '&spbill_create_ip=' + spbill_create_ip
    //  + '&key=' + key;
    //console.log(unifiedPayment);
    //console.log('md5');
    //var sign = util.hexMd5(unifiedPayment).toUpperCase();
    console.log(sign);

    //封装xml参数  
    var formData = "<xml>"
    formData += "<amount>" + amount + "</amount>"
    formData += "<body>" + body + "</body>"
    formData += "<check_name>" + check_name + "</check_name>"
    formData += "<desc>" + desc + "</desc>"
    formData += "<mch_appid>" + mch_appid + "</mch_appid>"
    formData += "<mchid>" + mchid + "</mchid>"
    formData += "<nonce_str>" + nonce_str + "</nonce_str>"
    formData += "<notify_url>" + notify_url + "</notify_url>"
    formData += "<openid>" + openid + "</openid>"
    formData += "<partner_trade_no>" + partner_trade_no + "</partner_trade_no>"
    formData += "<re_user_name>" + re_user_name + "</re_user_name>"
    formData += "<sign_type>" + sign_type + "</sign_type>"
    formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"
    formData += "<sign>" + sign + "</sign>"
    formData += "</xml>"

    var BOUNDARYPREFIX = 'wxmebn';
    var max = 9007196154740990;
    var dec = Math.random() * max;
    var hex = dec.toString(36);
    var boundary = BOUNDARYPREFIX + hex;

    var body = util.format('Content-Type: multipart/form-data; boundary=%s\r\n\r\n', boundary)
        + util.format('--%s\r\n', boundary)
        + formData
        + util.format('\r\n--%s', boundary);

    //console.log(body);

    var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
    var parse_url = require('url').parse(url, true);
    console.log(parse_url.hostname);
    console.log(parse_url.path);
    var options = {
        host: parse_url.hostname,
        port: 443,
        path: parse_url.path,
        method: 'POST',
        //key: fs.readFileSync('./keys/client-key.pem'),
        //cert: fs.readFileSync('./keys/client-cert.pem'),
        //ca: [fs.readFileSync('./keys/ca-cert.pem')],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length
        }
    };

    https.request(options, function (resHttps) {
        console.log("statusCode: ", resHttps.statusCode);
        console.log("headers: ", resHttps.headers);

        resHttps.setEncoding('utf8');

        // write data to request body
        reqHttps.write(formData);
        reqHttps.end();

        resHttps.on('data', function (body1) {
          console.log("data: " + body1);
          resolve(body1);
        });

        reqHttps.on('error', function (e) {
          console.error("error:" + e);
          reject(e);
        });
    });
  }
}