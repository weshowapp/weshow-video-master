'use strict';

import Base from './base.js';

var wxconst = require('./wxconst');

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let id = this.post('id');
    let size = this.post('size');
    let openid = this.post('openid');
    let tm = this.post('tm');
    if (!this.checkTimeStamp(tm)) {
      return this.success({
        result: 'OK',
        errorCode: 0
      });
    }
    if (id == '' || id == undefined || id == null || id == NaN) {
      id = 0;
    }
    if (size == '' || size == undefined || size == null || size == NaN) {
      size = 10;
    }
    if (openid == '' || openid == undefined || openid == null || openid == NaN) {
      openid = '';
    }
    let list = null;
    if (openid == '') {
      list = await this.model('wxcash').where({id: [">=", id]}).limit(size).select();
    }
    else {
      list = await this.model('wxcash').where({openid: openid}).limit(size).select();
    }
    if (!think.isEmpty(list)) {
      for (var i = 0; i < list.length; i++) {
        list[i].str_time = this.getFullDateTime(list[i].add_time);
        /*let userInfo = await this.model('user').where({openid: list[i].openid}).find();
        if (!think.isEmpty(userInfo)) {
          list[i].username = userInfo.name;
        }*/
      }
    }
    var tk = this.post('wxtoken');
    this.assign({'wxcash_list': list, 'wxtoken': tk});
    this.display();
  }

  async getuserdetailAction() {
    let uid = this.get('openid');
    //let type = this.get('draw_type');

    let l = await this.model('wxcash').where({openid: uid, cash_val: [">", 0]}).order('add_time DESC').limit(30).select();
    if (!think.isEmpty(l)) {
      for (var i = 0; i < l.length; i++) {
        l[i].open_gid = '0';
        if (think.isEmpty(l[i].quizid)) { l[i].quizid = 0; }
        let quizInfo = await this.model('quiz').where({ id: l[i].quizid }).find();
        if (!think.isEmpty(quizInfo)) {
          l[i].open_gid = quizInfo.open_gid;
        }
        l[i].format_time = this.formatDateTime(l[i].add_time);
        l[i].str_time = this.getFullDateTime(l[i].add_time);
        if (l[i].draw_type == wxconst.WXCASH_OP_TYPE_PAY) {
          l[i].desc = '创建比赛充入 + ';
        }
        else if (l[i].draw_type == wxconst.WXCASH_OP_TYPE_DRAW) {
          l[i].desc = '提现 - ';
        }
        else if (l[i].draw_type == wxconst.WXCASH_OP_TYPE_WIN) {
          l[i].desc = '赢取 + ';
        }
        else if (l[i].draw_type == wxconst.WXCASH_OP_TYPE_GAME) {
          l[i].desc = '创建比赛支出 - ';
        }
        else {
          l[i].desc = '其他操作';
        }
      }
    }

    return this.success({
      list: l
    });

  }
  
  async getuserdrawAction() {
    let uid = this.get('openid');
    let l = await this.model('wxcash').where({openid: uid, draw_type: 2}).order('add_time DESC').select();
    if (!think.isEmpty(l)) {
      for (var i = 0; i < l.length; i++) {
        l[i].current_time = this.getCurrentTime();
      }
    }
    return this.success({
      list: l
    });

  }

  async addAction() {
    let uid = this.post('openid');
    let name = this.post('username');
    let cash_val = this.post('cash_val');
    let draw_type = this.post('draw_type');
    let note = this.post('note');
    //let tm = this.post('add_time');
    var tm = this.getCurrentTime();

    /*let addResult = await this.model('wxcash').add({
      openid: uid,
      username: name,
      cash_val: cash_val,
      draw_type: 2,
      note: note,
      add_time: tm
    });*/

    let addResult = await this.model('wxcash').addOp(uid, '0', cash_val, wxconst.WXCASH_OP_TYPE_DRAW, wxconst.WXCASH_OP_NOTE_DRAW, tm);

    return this.success({
      result: 'OK',
      wxcash: addResult,
      errorCode: 0
    });
  }

}