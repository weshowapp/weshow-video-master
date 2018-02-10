'use strict';

import Base from './base.js';
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html

    let uid = this.get('uid');
    let userInfo = await this.model('user').where({id: uid}).select();
    //delete userInfo.password;
    return this.json(userInfo);
  }

  async infoAction(){
	let userid = this.get('userid');
    let userInfo = await this.model('user').where({openid: userid}).find();
    //delete userInfo.password;
    if (!think.isEmpty(userInfo)) {
      //wx.login()...
    }
	
	console.log('userinfo');
    let count = await this.model('question').where({creator_id: userid}).count();
    //if (!think.isEmpty(count))
	{
	  console.log('userinfo question count');
	  console.log(count);
	  userInfo.question_count = count;
	}
	//console.log(userInfo);

    let sessionData = { user_id: userInfo.id, openid: userInfo.openid };
    sessionData.seed = Math.floor((new Date()).getTime() / 1000);
    let TokenSerivce = this.service('token');
    let tokenObj = new TokenSerivce();
    let sessionKey = await tokenObj.create(sessionData);
    userInfo.wxtoken = sessionKey;

    return this.json(userInfo);
  }

  async levelAction(){
	let userid = this.get('userid');
    let userInfo = await this.model('user').where({openid: userid}).find();
    //delete userInfo.password;
    return this.json(userInfo.level);
  }

  async addAction() {
    let userid = this.post('userid');
    let name = this.post('name');
    let country = this.post('country');
    let province = this.post('province');
    let city = this.post('city');
    let gender = this.post('gender');
    let language = this.post('language');
    let avatarUrl = this.post('avatarUrl');
    let inviter_id = this.post('inviter_id');
    let inviter_code = this.post('inviter_code');
    let add_time = this.post('add_time');
	console.log('User.add');
	console.log(name);
	
	var invition_code = this.model('user').randomString(6);

    var addResult = -1;
    var added = false;
    let existInfo = await this.model('user').where({openid: userid}).find();
    if (!think.isEmpty(existInfo)) {
      addResult = existInfo.uid;
		/*return this.success({
          result: 'ALREADY EXIST',
	      uid: -1,
          errorCode: 1
        });*/
	}
    else {
      added = true;
      addResult = await this.model('user').add({
		openid: userid,
		country: country,
		province: province,
        city: city,
		gender: gender,
		language: language,
		photo_url: avatarUrl,
		inviter_id: inviter_id,
		inviter_code: inviter_code,
		invition_code: invition_code,
        reg_time: add_time,
		name: name
      });

      console.log(addResult);
      if (addResult >= 0) {
        let userInfo = await this.model('user').where({openid: inviter_id, invition_code: inviter_code, _logic: "OR"}).find();
	    if (!think.isEmpty(userInfo)) {
	        await this.model('user').updateRelive(inviter_id, 1, 1, '0', userid);
		    var relive = 1 + userInfo.relive;
            let result = await this.model('user').where({openid: inviter_id}).update({
                relive: relive
            });
	    }
      }
	  existInfo = await this.model('user').where({openid: userid}).find();
    }

    let sessionData = { user_id: addResult, openid: userInfo.openid };
    sessionData.seed = Math.floor((new Date()).getTime() / 1000);
    let TokenSerivce = this.service('token');
    let tokenObj = new TokenSerivce();
    let sessionKey = await tokenObj.create(sessionData);
    existInfo.wxtoken = sessionKey;
	
	return this.success({
      result: 'OK',
	  uid: addResult,
      isNew: added,
	  wxtoken: sessionKey,
	  data: existInfo,
      errorCode: 0
    });
  }

  async updlevelAction(){
	let uid = this.post('uid');
	let level = this.post('level');
    let result = await this.model('user').where({id: uid}).update({
      level: level
    });
    return this.json(result);
  }

  async addpriceAction(){
	let userid = this.post('openid');
	let price = this.post('price');

	var result = -1;
    let userInfo = await this.model('user').where({openid: userid}).find();
	if (!think.isEmpty(userInfo)) {
	  price = price + userInfo.win;
      result = await this.model('user').where({openid: userid}).update({
        win: price
      });
	}
    return this.json(result);
  }

  async updatereliveAction() {
	console.log('updaterelive');
	let userid = this.post('openid');
	let quizid = this.post('quizid');
	let rel = this.post('relive');
	let add = this.post('add');
	console.log(userid);
	console.log(rel);
	console.log(add);

	let result = await this.model('user').updateRelive(userid, add, rel, quizid, '0');

    return this.json(result);
  }

  async updatequestioncountAction() {
	console.log('update_q_count');
	let userid = this.post('openid');
	let q_count = this.post('question_count');
	let add = this.post('add');
	console.log(q_count);

	var result = -1;
    let userInfo = await this.model('user').where({openid: userid}).find();
	if (!think.isEmpty(userInfo)) {
		if (add == 1) {
			result = await this.model('user').where({openid: userid}).increment('question_count', q_count);
			//q_count = q_count + userInfo.question_count;
		}
		else {
			result = await this.model('user').where({openid: userid}).decrement('question_count', q_count);
			//q_count = userInfo.question_count - q_count;
		}
        //result = await this.model('user').where({openid: userid}).update({
        //  question_count: q_count
        //});
	}
    return this.json(result);
  }

  /**
   * 保存用户头像
   * @returns {Promise.<void>}
   */
  async saveAvatarAction(){

    let avatar = this.file('avatar');
    if (think.isEmpty(avatar)) {
      return this.fail('保存失败');
    }

    let filename = 1;
    let avatar_path = think.RESOURCE_PATH + '/static/user/avatar/1.' + _.last(_.split(avatar.path, '.'));

    fs.rename(avatar.path, avatar_path, function (res) {
      return this.success(1);
    });

  }
}