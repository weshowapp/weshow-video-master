'use strict';

import Base from './base.js';
const rp = require("request-promise");
const request = require("request");
const fs = require('fs');
const _ = require('lodash');

var crypto = require('crypto');
var querystring = require("querystring");
const secId = 'AKIDd7NN7aukRr53lDOM3UhlaS6TdXBY8U3M';
const secKey = '';

const appId = 'wxc906ef0ac5d12a4b';
const appKey = '';
const mchId = '1497874882';
const mchPayKey = '';
const PayNotifyUrl = 'https://www.imcou.com/api/wxpay/notify'

var WXBizDataCrypt = require('./WXBizDataCrypt');

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {

    let avatar_path = think.RESOURCE_PATH + '/static/user/avatar/1.' + _.last(_.split('https://img6.xxx.com/img/image/smallpic/liutaoxiaotu.jpg', '.'));
    return this.success(avatar_path);
  }

  async decryptshareAction() {
    let data = this.post('data');
	let iv = this.post('iv');
	let app_id = this.post('appid');
	let sessionKey = this.post('session_key');
	if (think.isEmpty(app_id)) {
		app_id = appId;
	}
	//console.log(data);
	var pc = new WXBizDataCrypt(app_id, sessionKey);
    var ddata = pc.decryptData(data, iv);
	console.log(ddata);
	return this.success({
      dedata: ddata
	});
  }

  async argsigAction() {
    let url = this.post('url');
    let ath = this.post('ath');
	var sign = crypto.createHmac(ath, secKey).update(url).digest().toString('base64');
	console.log(sign);
	return this.success({
      sign: sign
	});
  }

  async uploadsigAction() {
	var current = parseInt((new Date()).getTime() / 1000);
    var expired = current + 86400 * 3;  // 签名有效期：3天
	var rand = Math.round(Math.random() * Math.pow(2, 32));

    // 向参数列表填入参数
    var arg_list = {
      secretId : secId,
      currentTimeStamp : current,
      expireTime : expired,
      random : rand
    }

    // 计算签名
    var orignal = querystring.stringify(arg_list);
    var orignal_buffer = new Buffer(orignal, "utf8"); 

    var hmac = crypto.createHmac("sha1", secKey);
    var hmac_buffer = hmac.update(orignal_buffer).digest();

    var signature = Buffer.concat([hmac_buffer, orignal_buffer]).toString("base64");

    console.log(signature);

	return this.success({
      sign: signature,
	  timestamp: current,
	  expire: expired,
	  random: rand
	});
  }

  async getwxpayunifiedAction() {
    var fee = this.post('fee');
    var pay_sn = this.post('pay_sn');
	var appid = appId;
    var body = 'QuestionPaltform';//商户名
    var mch_id = mchId;//商户号
    var nonce_str = this.post('nonce');
    var notify_url = PayNotifyUrl;//通知地址
    var openid = this.post('openid');
    var sign_type = 'MD5';
    var spbill_create_ip = this.ip();//ip
    var trade_type = "JSAPI";
    var key = mchPayKey;
	
    var unifiedPayment = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id
      + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid
      + '&out_trade_no=' + pay_sn + '&sign_type=' + sign_type + '&spbill_create_ip=' + spbill_create_ip
      + '&total_fee=' + fee + '&trade_type=' + trade_type + '&key=' + key;
    //unifiedPayment = "appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
    //unifiedPayment = unifiedPayment + "&key=192006250b4c09247ec02edce69f6a2d";
    console.log(unifiedPayment);
    console.log('md5');
    var sign = md5.hexMd5(unifiedPayment).toUpperCase();
    console.log(sign);

    //封装统一支付xml参数  
    var formData = "<xml>"
    formData += "<appid>" + appid + "</appid>"
    formData += "<body>" + body + "</body>"
    formData += "<mch_id>" + mch_id + "</mch_id>"
    formData += "<nonce_str>" + nonce_str + "</nonce_str>"
    formData += "<notify_url>" + notify_url + "</notify_url>"
    formData += "<openid>" + openid + "</openid>"
    formData += "<out_trade_no>" + pay_sn + "</out_trade_no>"
    formData += "<sign_type>" + sign_type + "</sign_type>"
    formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"
    formData += "<total_fee>" + fee + "</total_fee>"
    formData += "<trade_type>" + trade_type + "</trade_type>"
    formData += "<sign>" + sign + "</sign>"
    formData += "</xml>"
	
	let options = {
      method: 'POST',
      url: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers',
	  head: 'application/x-www-form-urlencoded',
	  data: formData
    };

    let resultData = await rp(options);
    return this.success({ data: resultData });
  }
 
  //获取openid
  async getwxsessionAction() {
    let code = this.post('code');
    let options = {
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        grant_type: 'authorization_code',
        js_code: code,
        secret: appKey,
        appid: appId
      }
    };

    let sessionData = await rp(options);
    sessionData = JSON.parse(sessionData);
    if (!sessionData.openid) {
      return this.fail('登录失败');
    }
    return this.success({ session_key: sessionData.session_key, openid: sessionData.openid });
  }
  
  async loginByWeixinAction() {

    let code = this.post('code');
    let fullUserInfo = this.post('userInfo');
    let userInfo = fullUserInfo.userInfo;

    //获取openid
    let options = {
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        grant_type: 'authorization_code',
        js_code: code,
        secret: appKey,
        appid: appId
      }
    };

    let sessionData = await rp(options);
    sessionData = JSON.parse(sessionData);
    if (!sessionData.openid) {
      return this.fail('登录失败');
    }

    //验证用户信息完整性
    const crypto = require('crypto');
    const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData + sessionData.session_key).digest('hex');
    if (fullUserInfo.signature !== sha1) {
      return this.fail('登录失败');
    }

    // 根据openid查找用户是否已经注册
    let userId = await this.model('user').where({ weixin_openid: sessionData.openid }).getField('id', true);
    if (think.isEmpty(userId)) {
      //注册
      userId = await this.model('user').add({
        username: '微信用户' + think.uuid(6),
        password: sessionData.openid,
        register_time: parseInt(new Date().getTime() / 1000),
        register_ip: this.ip(),
        last_login_time: parseInt(new Date().getTime() / 1000),
        last_login_ip: this.ip(),
        weixin_openid: sessionData.openid,
        avatar: userInfo.avatarUrl,
        gender: userInfo.gender, //性别 0：未知、1：男、2：女
        nickname: userInfo.nickName
      });
    }

    sessionData.user_id = userId;

    //查询用户信息
    let newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();

    //更新登录信息
    userId = await this.model('user').where({ id: userId }).update({
      last_login_time: parseInt(new Date().getTime() / 1000),
      last_login_ip: this.ip(),
    });

    let TokenSerivce = this.service('token');
    let tokenObj = new TokenSerivce();
    let sessionKey = await tokenObj.create(sessionData);

    if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    return this.success({ token: sessionKey, userInfo: newUserInfo });
  }

  async logoutAction() {
    return this.success();
  }
}