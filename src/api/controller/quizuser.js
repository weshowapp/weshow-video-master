'use strict';

import Base from './base.js';
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {

  async getbyquizidAction(){
	let qid = this.get('quizid');
	
	await this.model('quizuser').calculateGain(qid);
	
    let info = await this.model('quizuser').where({quizid: qid}).limit(8).select();
	await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }
  
  async getquizuserAction(){
	let qid = this.get('quizid');
	let uid = this.get('openid');
	
	await this.model('quizuser').calculateGain(qid);
	
    let info = await this.model('quizuser').where({quizid: qid, openid: uid}).select();
	await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }
  
  async getbyuidAction() {
	let uid = this.get('uid');
    let info = await this.model('quizuser').where({uid: uid}).select();
	await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }

  async getbyopenidAction() {
	let uid = this.get('openid');
    let info = await this.model('quizuser').where({openid: uid}).select();
	await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }

  async getansweredAction() {
	let quizid = this.get('quizid');
	let question_id = this.get('question_id');
    let info = await this.model('quizuser').where({quizid: quizid, answer_status: question_id}).select();
	await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }

  async addAction() {
	let quizid = this.post('quizid');
	let uid = this.post('userid');
	let note = this.post('note');
    let add_time = this.post('add_time');
	console.log('QuizUser.add');
	console.log(uid);
	console.log(quizid);
	console.log(add_time);
	
	let existInfo = await this.model('quizuser').where({openid: uid, quizid: quizid}).find();
	if (!think.isEmpty(existInfo)) {
		return this.success({
          result: 'ALREADY EXIST',
	      rid: -1,
          errorCode: 1
        });
	}
    let addResult = await this.model('quizuser').add({
        add_time: add_time,
        quizid: quizid,
		openid: uid,
		note: note
    });
	
	return this.success({
      result: 'OK',
	  rid: addResult,
      errorCode: 0
    });
  }
  
  async updatestatusAction() {
    var gstatus = this.post('status');
    var uid = this.post('uid');
    var openid = this.post('openid');
    var qid = this.post('quizid');
    console.log(qid);
    console.log(gstatus);

    await this.model('quizuser').where({quizid: qid, openid: openid}).update({
	  game_status: gstatus
    });

	await this.model('quizuser').calculateGain(qid);
	let quizInfo = await this.model('quiz').where({id: qid}).find();
	if (!think.isEmpty(quizInfo)) {
	  await this.model('user').updateRelive(quizInfo.creator_id, 1, 1, qid, '0');
	}
	
    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }
  
  async updateansweredAction() {
    var userid = this.post('openid');
    var question_id = this.post('question_id');
    var qid = this.post('quizid');
    let answer_time = this.post('answer_time');
    console.log(qid);
    console.log(question_id);

    await this.model('quizuser').where({quizid: qid, openid: userid}).update({
      answer_status: question_id,
	  answer_time: answer_time
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }
}