'use strict';

import Base from './base.js';
var wxconst = require('./wxconst');
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {

  async getbyquizidAction() {
    let qid = this.get('quizid');
    let onlywin = this.get('onlywin');
    if (onlywin != 1 && onlywin != '1') {
      let refresh = this.get('refresh');
      if (await this.model('quizuser').noNewData(qid, refresh, this.get('timestamp'))) {
        return this.fail({
          result: 'NO NEW DATA',
          hasNew: 0,
          errorCode: 1
        });
      }
    }

    let info = null;
    let quizInfo = await this.model('quiz').where({id: qid}).find();
    if (!think.isEmpty(quizInfo)) {
      console.log('getbyquizid');
      console.log(quizInfo.category);
      console.log(quizInfo.creator_id);
      if (onlywin == 1 || onlywin == '1') {
        if (quizInfo.category == 17) {
          info = await this.model('quizuser').where({ quizid: qid, game_status: wxconst.GAME_STATUS_WIN, openid: ["!=", quizInfo.creator_id]}).order('add_time DESC').limit(8).select();
        }
        else {
          info = await this.model('quizuser').where({ quizid: qid, game_status: wxconst.GAME_STATUS_WIN }).order('add_time DESC').limit(8).select();
        }
      }
      else {
        if (quizInfo.category == 17) {
          info = await this.model('quizuser').where({ quizid: qid, openid: ["!=", quizInfo.creator_id]}).order('add_time DESC').limit(8).select();
        }
        else {
          info = await this.model('quizuser').where({ quizid: qid }).order('add_time DESC').limit(8).select();
        }
      }
    }
    await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }
  
  async getquizuserAction() {
    let qid = this.get('quizid');
    let uid = this.get('openid');
    let refresh = this.get('refresh');
    if (await this.model('quizuser').noNewData(qid, refresh, this.get('timestamp'))) {
      return this.fail({
        result: 'NO NEW DATA',
        hasNew: 0,
        errorCode: 1
      });
    }

    let info = await this.model('quizuser').where({ quizid: qid, openid: uid }).select();
    await this.model('quizuser').setUserInfoWithUid(info, uid);
    return this.json(info);
  }
  
  async getbyuidAction() {
    let uid = this.get('uid');
    /*let refresh = this.get('refresh');
    if (await this.model('quizuser').noNewData('', refresh, this.get('timestamp'))) {
      return this.fail({
        result: 'NO NEW DATA',
        hasNew: 0,
        errorCode: 1
      });
    }*/
    let info = await this.model('quizuser').where({ uid: uid }).select();
    await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }

  async getbyopenidAction() {
    let uid = this.get('openid');
    /*let refresh = this.get('refresh');
    if (await this.model('quizuser').noNewData('', refresh, this.get('timestamp'))) {
      return this.fail({
        result: 'NO NEW DATA',
        hasNew: 0,
        errorCode: 1
      });
    }*/
    let info = await this.model('quizuser').where({ openid: uid }).select();
    await this.model('quizuser').setUserInfoWithUid(info, uid);
    return this.json(info);
  }

  async getansweredAction() {
    let quizid = this.get('quizid');
    let question_id = this.get('question_id');
    let refresh = this.get('refresh');
    if (await this.model('quizuser').noNewData(quizid, refresh, this.get('timestamp'))) {
      return this.fail({
        result: 'NO NEW DATA',
        hasNew: 0,
        errorCode: 1
      });
    }
    let info = await this.model('quizuser').where({ quizid: quizid, answer_status: question_id }).order('answer_time DESC').select();
    await this.model('quizuser').setUserInfo(info);
    return this.json(info);
  }

  async addAction() {
    let quizid = this.post('quizid');
    let uid = this.post('userid');
    let note = this.post('note');
    //let add_time = this.post('add_time');
    var add_time = this.getCurrentTime();
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
    
    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async updategainAction() {
    var openid = this.post('openid');
    var qid = this.post('quizid');
    console.log(qid);
    console.log('updategain');

    var quizuserModel = this.model('quizuser');
    var quizModel = this.model('quiz');
    var userModel = this.model('user');
    var trResult = quizuserModel.transaction(function () {
      return quizuserModel.calculateGain(qid).then(function (result) {
        if (result) {
          let quizInfo = quizModel.where({id: qid}).find();
          console.log(quizInfo);
          if (!think.isEmpty(quizInfo)) {
            return userModel.updateRelive(quizInfo.creator_id, wxconst.RELIVE_ADD, 1, qid, '0');
          }
        }
        return false;
      });
    }).then(function (result) {
      return result;
    }).catch(function (err) {
      return err;
    })

    return this.success({
      result: 'OK',
      errorCode: trResult
    });
  }

  async updateansweredAction() {
    var userid = this.post('openid');
    var question_id = this.post('question_id');
    var answer_set = this.post('answer_set');
    var answer_correct = this.post('answer_correct');
    var qid = this.post('quizid');
    //let answer_time = this.post('answer_time');
    var answer_time = this.getCurrentTime();
    console.log(qid);
    console.log(question_id);

    await this.model('quizuser').where({quizid: qid, openid: userid}).update({
      answer_status: question_id,
      answer_set: answer_set,
      answer_correct: answer_correct,
      answer_time: answer_time
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }
}