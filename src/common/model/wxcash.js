'use strict';

import Base from './base.js';

export default class extends Base {


  async addOp(uid, name, cash_val, draw_type, note, tm) {
	
		let addResult = await this.model('wxcash').add({
            openid: uid,
			username: name,
			cash_val: cash_val,
			draw_type: draw_type,
			note: note,
			add_time: tm
        });
	
	return addResult;
  }

}