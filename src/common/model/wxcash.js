'use strict';

import Base from './base.js';

export default class extends Base {


  async addOp(uid, quizid, cash_val, draw_type, note, tm) {
	
    console.log('addOp');
    console.log(uid);
    console.log(quizid);
    console.log(cash_val);
		let addResult = await this.model('wxcash').add({
            openid: uid,
			quizid: quizid,
			cash_val: cash_val,
			draw_type: draw_type,
			note: note,
			add_time: tm
        });
	

    let userInfo = await this.model('user').where({openid: uid}).find();
    if (!think.isEmpty(userInfo)) {
	  var bal = userInfo.balance;
      console.log('bal ' + bal);
      if (draw_type == 1 || draw_type == 3) {
		bal = bal + parseFloat(cash_val);
      }
      else {
		bal = bal - parseFloat(cash_val);
      }
      console.log('bal new ' + bal);
      await this.model('user').where({openid: uid}).update({
        balance: bal
      });
	}
	return addResult;
  }

}