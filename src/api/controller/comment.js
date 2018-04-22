'use strict';

import Base from './base.js';

var fs = require('fs');
var path = require('path');
var wxconst = require('./wxconst');
var xwords = require('./xwords');

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let cid = this.get('comment_id');
    let openid = this.get('openid');
    
    let comment = await this.model('comment').where({id: cid}).find();
    await this.model('comment').setQuizQuestion(quiz, openid);
    await this.model('comment').setQuizState(quiz, openid);

    return this.success({
      dataList: comment
    });

  }
  
  async getbyuserAction() {
    let openid = this.get('openid');
    let onlyactive = this.get('onlyactive');
    console.log(openid);
    let quizIdList = await this.model('quizuser').field('quizid').where({openid: openid}).order('add_time DESC').limit(100).select();
    let groupList = await this.model('usergroup').field('open_gid').where({openid: openid}).select();
    var gidList = [];
    if (!think.isEmpty(groupList)) {
        for (var i = 0; i < groupList.length; i++) {
            gidList.push(groupList[i].open_gid);
        }
    }
    let list = null;
    //console.log(quizIdList.length);
    if (!think.isEmpty(quizIdList) || gidList.length > 0) {
        var qidList = [];
        for (var i = 0; i < quizIdList.length; i++) {
            qidList.push(quizIdList[i].quizid);
        }
        //console.log(qidList);

        var curTime = this.getCurrentTime();
        var complexQuery0 = {'id': ["IN", qidList],
            type: wxconst.QUIZ_TYPE_PUBLIC,
            _logic: "OR"
        };
        var complexQuery1 = complexQuery0;
        if (gidList.length > 0) {
          complexQuery1 = {'id': ["IN", qidList],
            'open_gid': ["IN", gidList],
            type: wxconst.QUIZ_TYPE_PUBLIC,
            _logic: "OR"
          };
        }
        if (onlyactive == 1) {
          list = await this.model('quiz').where({
              _complex: complexQuery1,
              pay_status: 1,
              start_time: [">", curTime]
          }).order('start_time DESC').limit(10).select();
        }
        else {
          list = await this.model('quiz').where({
              _complex: complexQuery1,
              pay_status: 1
          }).order('start_time DESC').limit(10).select();
        }
        if (!think.isEmpty(list)) {
          console.log(list.length);
          for (var i = 0; i < list.length; i++) {
            //console.log(i);
            await this.model('quiz').setQuizState(list[i], openid);
            if (list[i].is_completed == 0) {
                await this.model('quiz').setQuizQuestion(list[i], openid);
            }
            
            let quInfo = await this.model('quizuser').where({quizid: list[i].id, openid: openid}).find();
            if (!think.isEmpty(quInfo)) {
                let userInfo = await this.model('user').where({openid: quInfo.openid}).find();
                if (!think.isEmpty(userInfo)) {
                    quInfo.user_photo = userInfo.photo_url;
                }
            }
            list[i].userdata = quInfo;
          }
        }
    }

    return this.success({
      quizList: list
    });

  }

  async addAction() {
    let openid = this.post('openid');
    let artid = this.post('artid');
    let note = this.post('note');
    let words = this.post('words');
    let up = this.post('up');
    let down = this.post('down');
    let shared = this.post('shared');
    let read_dur = this.post('read_dur');
    let read_count = this.post('read_count');
    let read_time = this.post('read_time');
    var create_time = this.getCurrentTime();
    console.log('addAction');

    let addResult = await this.model('comment').add({
        openid: openid,
        artid: artid,
        note: note,
        words: words,
        up: up,
        down: down,
        shared: shared,
        read_dur: read_dur,
        read_count: read_count,
        read_time: read_time,
        create_time: create_time
    });

    return this.success({
      result: 'OK',
      add_id: addResult,
      errorCode: 0
    });
  }


}
