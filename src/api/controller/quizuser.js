'use strict';

import Base from './base.js';
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {

  async getbyquizidAction(){
	let qid = this.get('quizid');
    let info = await this.model('quizuser').where({quizid: qid}).select();
    return this.json(info);
  }
  
  async getbyuidAction(){
	let uid = this.get('uid');
    let info = await this.model('quizuser').where({uid: uid}).select();
    return this.json(info);
  }

  async getbyopenidAction(){
	let uid = this.get('openid');
    let info = await this.model('quizuser').where({openid: uid}).select();
    return this.json(info);
  }

  async addAction(){
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

}