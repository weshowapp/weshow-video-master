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
    delete userInfo.password;
    return this.json(userInfo);
  }

  async infoAction(){
	let userid = this.get('userid');
    let userInfo = await this.model('user').where({openid: userid}).find();
    delete userInfo.password;
	console.log(userInfo);
    return this.json(userInfo);
  }

  async levelAction(){
	let userid = this.get('userid');
    let userInfo = await this.model('user').where({openid: userid}).find();
    //delete userInfo.password;
    return this.json(userInfo.level);
  }

  async addAction(){
    let userid = this.post('userid');
    let name = this.post('name');
    let country = this.post('country');
    let province = this.post('province');
    let city = this.post('city');
    let gender = this.post('gender');
    let language = this.post('language');
    let avatarUrl = this.post('avatarUrl');
    let add_time = this.post('add_time');
	console.log('User.add');
	console.log(name);
	
    let addResult = await this.model('user').add({
		openid: userid,
		country: country,
		province: province,
        city: city,
		gender: gender,
		language: language,
		photo_url: avatarUrl,
        reg_time: add_time,
		name: name
    });
	
	return this.success({
      result: 'OK',
	  uid: addResult,
      errorCode: 0
    });
  }

  async updlevelAction(){
	let uid = this.get('uid');
	let level = this.get('level');
    let result = await this.model('user').where({id: uid}).update({
      level: level
    });
    return this.json(result);
  }

  async addpriceAction(){
	let userid = this.get('openid');
	let price = this.get('price');

    let userInfo = await this.model('user').where({openid: userid}).find();
	if (!think.isEmpty(userInfo)) {
	  price = price + userInfo.win;
	}
    let result = await this.model('user').where({openid: userid}).update({
      win: price
    });
    return this.json(result);
  }

  async addreliveAction(){
	let userid = this.get('openid');
	let relive = this.get('relive');

    let userInfo = await this.model('user').where({openid: userid}).find();
	if (!think.isEmpty(userInfo)) {
	  relive = relive + userInfo.relive;
	}
    let result = await this.model('user').where({openid: userid}).update({
      relive: relive
    });
    return this.json(result);
  }

  async addquestioncountAction(){
	let userid = this.get('openid');
	let question_count = this.get('question_count');

    let userInfo = await this.model('user').where({openid: userid}).find();
	if (!think.isEmpty(userInfo)) {
	  question_count = question_count + userInfo.question_count;
	}
    let result = await this.model('user').where({openid: userid}).update({
      question_count: question_count
    });
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