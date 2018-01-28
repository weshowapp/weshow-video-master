'use strict';

import Base from './base.js';
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {

  async getbyquizidAction(){
	let qid = this.get('quizid');
    let info = await this.model('quizuser').where({quizid: qid}).select();
	if (!think.isEmpty(info)) {
		for (var i = 0; i < info.length; i++) {
            let userInfo = await this.model('user').where({openid: info[i].openid}).find();
	        if (!think.isEmpty(userInfo)) {
	          info[i].user_photo = userInfo.photo_url;
	        }
		}
	}
    return this.json(info);
  }
  
  async getbyuidAction() {
	let uid = this.get('uid');
    let info = await this.model('quizuser').where({uid: uid}).select();
    let userInfo = await this.model('user').where({id: uid}).find();
	if (!think.isEmpty(info) && !think.isEmpty(userInfo)) {
		for (var i = 0; i < info.length; i++) {
	        info[i].user_photo = userInfo.photo_url;
		}
	}
    return this.json(info);
  }

  async getbyopenidAction() {
	let uid = this.get('openid');
    let info = await this.model('quizuser').where({openid: uid}).select();
    let userInfo = await this.model('user').where({openid: uid}).find();
	if (!think.isEmpty(info) && !think.isEmpty(userInfo)) {
		for (var i = 0; i < info.length; i++) {
	        info[i].user_photo = userInfo.photo_url;
		}
	}
    return this.json(info);
  }

  async getansweredAction() {
	let quizid = this.get('quizid');
	let question_id = this.get('question_id');
    let info = await this.model('quizuser').where({quizid: quizid, answer_status: question_id}).select();
	if (!think.isEmpty(info)) {
		for (var i = 0; i < info.length; i++) {
            let userInfo = await this.model('user').where({openid: info[i].openid}).find();
	        if (!think.isEmpty(userInfo)) {
	          info[i].user_photo = userInfo.photo_url;
	        }
		}
	}
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

    await this.model('quizuser').where({quizid: qid}).update({
      openid: openid,
	  uid: uid,
	  game_status: gstatus
    });
	
    let info = await this.model('quizuser').where({quizid: qid, answer_status: 0}).select();
	if (think.isEmpty(info)) {
	    //全部回答完成
		let winList = await this.model('quizuser').where({quizid: qid, answer_status: 1}).select();
		if (!think.isEmpty(winList)) {
		    let quiz = await this.model('quiz').where({id: qid}).find();
			if (!think.isEmpty(quiz)) {
				var winCount = winList.length;
				var price = quiz.price / winCount;
				for (var i = 0; i < winCount; i++) {
				    let userInfo = await this.model('user').where({openid: winList[i].openid}).find();
    				if (!think.isEmpty(userInfo)) {
	    				price = price + userInfo.win;
		    		}
			    	let result = await this.model('user').where({openid: winList[i].openid}).update({
				    	win: price
				    });
				}

				await this.model('quizuser').where({quizid: qid}).update({
					game_gain: price
				});

				await this.model('quiz').where({id: qid}).update({
					win_users: winCount
				});
			}
		}
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