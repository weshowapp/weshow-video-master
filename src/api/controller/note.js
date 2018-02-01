'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let l = await this.model('note').limit(30).select();

    return this.success({
      list: l
    });

  }

  async addAction() {
    let uid = this.post('userid');
    let note = this.post('note');
    let more = this.post('more');
    let tm = this.post('add_time');
	
		let addResult = await this.model('note').add({
            userid: uid,
			note: note,
			more: more,
			add_time: tm
        });
	
	return this.success({
      result: 'OK',
	  note: addResult,
      errorCode: 0
    });
  }

}