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
  
  async getuserdrawAction() {
    let uid = this.get('openid');
    let l = await this.model('wxcash').where(openid: uid, draw_type: 2).max(add_time).select();

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
    let tm = this.post('add_time');
	
		let addResult = await this.model('wxcash').add({
            openid: uid,
			username: name,
			cash_val: cash_val,
			draw_type: draw_type,
			note: note,
			add_time: tm
        });
	
	return this.success({
      result: 'OK',
	  note: addResult,
      errorCode: 0
    });
  }

}