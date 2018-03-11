'use strict';

import Base from './base.js';

var fs = require('fs');
var path = require('path');
var wxconst = require('./wxconst');

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let quiz_id = this.get('quiz_id');
    let openid = this.get('openid');
    
    let quiz = await this.model('quiz').where({id: quiz_id}).find();
    await this.model('quiz').setQuizQuestion(quiz, openid);
    await this.model('quiz').setQuizState(quiz, openid);

    return this.success({
      quizList: quiz
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
    let title = this.post('title');
    let create_time = this.post('create_time');
    let creator_id = this.post('creator_id');
    let creator_name = this.post('creator_name');
    let creator_photo = this.post('creator_photo');
    let creator_account = this.post('creator_account');
    let creator_level = this.post('creator_level');
    let quiz_level = this.post('quiz_level');
    let quiz_category = this.post('quiz_category');
    let quest_count = this.post('question_count');
    let quest_list = this.post('question_list');
    let min_users = this.post('min_users');
    let price = this.post('price');
    let quiz_award = this.post('quiz_award');
    let quiz_award_image = this.post('quiz_award_image');
    let start_time = this.post('start_time');
    create_time = this.getCurrentTime();
    console.log('addAction');
    console.log(price);
    console.log(quest_list);
    console.log(quest_count);

    var quiz_type = wxconst.QUIZ_TYPE_NORMAL;
    if (creator_level == wxconst.USER_LEVEL_PUBLIC) {
      quiz_type = wxconst.QUIZ_TYPE_PUBLIC;
    }
    if (quiz_category == wxconst.QUIZ_CATEGORY_SELF) {
      quiz_type = wxconst.QUIZ_TYPE_SELF;
    }
    else {
      quiz_type = wxconst.QUIZ_TYPE_NORMAL;
    }

    //let list = await this.model('question').where({id: randId}).limit(quest_count).select();
    if (think.isEmpty(quest_list) || quest_list == '' || quest_list.length == 0) {
      var list = await this.model('question').getRandomList(quest_count, quiz_type, quiz_level, wxconst.USER_ID_ADMIN);
      console.log(list.length);
      if (!think.isEmpty(list)) {
        quest_list = '';
        console.log('quest_list empty');
        quest_count = list.length;
        for (var i = 0; i < list.length; i++) {
            console.log(list[i].id);
            if (i == 0) {
                quest_list = list[i].id;
            }
            else {
                quest_list = quest_list + wxconst.QUIZ_QUESTION_SUBFIX + list[i].id;
            }
        }
        console.log(quest_list);
      }
    }

    let quizResult = await this.model('quiz').add({
        title: title,
        creator_id: creator_id,
        creator_name: creator_name,
        creator_photo: creator_photo,
        create_time: create_time,
        type: quiz_type,
        start_time: start_time,
        questions: quest_list,
        quest_count: quest_count,
        min_users: min_users,
        price: price,
        award: quiz_award,
        award_image: quiz_award_image,
        level: quiz_level,
        category: quiz_category
    });

    var interval = start_time - this.getCurrentTime() + 15 * quest_count;
    await this.model('quiz').createCalculateGainEvent(quizResult, interval);

    return this.success({
      result: 'OK',
      quiz_id: quizResult,
      errorCode: 0
    });
  }
  
  async updateshareAction() {
    var share_ticket = this.post('share_ticket');
    var open_gid = this.post('gid');
    var qid = this.post('quiz_id');
    console.log(qid);
    console.log(open_gid);

    await this.model('quiz').where({id: qid}).update({
      open_gid: open_gid,
      share_ticket: share_ticket
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async updatepayAction() {
    let openid = this.post('openid');
    let payed = this.post('pay_status');
    var qid = this.post('quiz_id');
    let cash_val = this.post('cash_val');
    let username = this.post('username');
    //let add_time = this.post('add_time');
    var add_time = this.getCurrentTime();
    console.log('updatepayAction');
    console.log(openid);
    console.log(cash_val);
    let result = await this.model('quiz').where({id: qid, creator_id: openid}).update({
      pay_status: payed
    });
    await this.model('wxcash').addOp(openid, qid, cash_val, wxconst.WXCASH_OP_TYPE_PAY, wxconst.WXCASH_OP_NOTE_PAY, add_time);
    return this.json(result);
  }

  async creategainprocAction() {
    await this.model('quiz').createCalculateGainProcedure();
    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async uploadawardAction() {
    var file = think.extend({}, this.file('file_input'));
    var filepath = file.path;

    var uploadPath = think.RESOURCE_PATH + '/static/award';
    think.mkdir(uploadPath);
    var basename = path.basename(filepath);
    fs.renameSync(filepath, uploadPath + '/' + basename);
    file.path = uploadPath + '/' + basename;

    var success = (think.isFile(file.path));
    var url = 'https://www.imcou.com/static/award/' + file.path;

    return this.success({
      result: 'OK',
      success: success,
      fileurl: url,
      errorCode: 0
    });
  }
}
