'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let l = await this.model('wxcash').limit(30).select();

    return this.success({
      list: l
    });

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
          l[i].format_time = this.formatDateTime(l[i].add_time);
          l[i].str_time = this.getFullDateTime(l[i].add_time);
          l[i].open_gid = quizInfo.open_gid;
        }
        if (l[i].draw_type == 1) {
          l[i].desc = '充入';
        }
        else if (l[i].draw_type == 2) {
          l[i].desc = '提现';
        }
        else if (l[i].draw_type == 3) {
          l[i].desc = '赢取';
        }
        else if (l[i].draw_type == 4) {
          l[i].desc = '花费';
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
    if (think.isEmpty(l)) {
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

    let addResult = await this.model('wxcash').add({
      openid: uid,
      username: name,
      cash_val: cash_val,
      draw_type: 2,
      note: note,
      add_time: tm
    });
	
    await this.model('wxcash').addOp(uid, '0', cash_val, 2, 'draw', tm);

	return this.success({
      result: 'OK',
	  wxcash: addResult,
      errorCode: 0
    });
  }

}