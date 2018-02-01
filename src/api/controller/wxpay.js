'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let l = await this.model('wxpay').limit(30).select();

    return this.success({
      list: l
    });

  }

  async notifyAction() {
    let return_code = this.post('return_code');
    let return_msg = this.post('return_msg');
	var msg = 'msg-' + return_code + '-' + return_msg;
	var tm = (new Date()).getTime();
	
		let addResult = await this.model('wxpay').add({
            notify: msg,
			add_time: tm
        });
	
	return this.success({
      result: 'OK',
	  notify: addResult,
      errorCode: 0
    });
  }

}