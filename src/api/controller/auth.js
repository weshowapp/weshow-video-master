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

const appid = 'wxbd7f58ae73e01ea8';
const sessionKey = '';
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
	var pc = new WXBizDataCrypt(appId, sessionKey);
    var ddata = pc.decryptData(data, iv);
	console.log(ddata);
	return this.success({
      dedata: ddata
	});
  }

  async argsigAction() {
    let url = this.post('url');
	var sign = crypto.createHmac('sha1', secKey).update(url).digest().toString('base64');
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
        secret: '00a2749d6f15e1979194d80b777e6adf',
        appid: 'wx262f4ac3b1c477dd'
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