'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let id = this.get('id');
    let size = this.get('size');
    let openid = this.get('openid');
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
        let userInfo = await this.model('user').where({openid: list[i].openid}).find();
        if (!think.isEmpty(userInfo)) {
          list[i].username = userInfo.name;
        }
      }
    }
    this.assign('wxcash_list', list);
    this.display();
  }

  async getuserdetailAction() {
    let uid = this.get('openid');
    //let type = this.get('draw_type');

    let l = await this.model('wxcash').where({openid: uid}).order('add_time DESC').select();
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
        if (l[i].draw_type == 1) {
          l[i].desc = '创建比赛充入 + ';
        }
        else if (l[i].draw_type == 2) {
          l[i].desc = '提现 - ';
        }
        else if (l[i].draw_type == 3) {
          l[i].desc = '赢取 + ';
        }
        else if (l[i].draw_type == 4) {
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
        l[i].current_time = Math.floor((new Date()).getTime() / 1000);
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
    var tm = Math.floor((new Date()).getTime() / 1000);

    /*let addResult = await this.model('wxcash').add({
      openid: uid,
      username: name,
      cash_val: cash_val,
      draw_type: 2,
      note: note,
      add_time: tm
    });*/

    let addResult = await this.model('wxcash').addOp(uid, '0', cash_val, 2, 'draw', tm);

    return this.success({
      result: 'OK',
      wxcash: addResult,
      errorCode: 0
    });
  }

}