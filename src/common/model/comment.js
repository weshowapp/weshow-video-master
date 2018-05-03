'use strict';

var wxconst = require('../../api/controller/wxconst');


/**
 * model
 */
export default class extends think.model.base {


async updatePowerOfUp(artid, openid) {
    var userModel = this.model('user');
    //var artModel = this.model('article');
    //var commentModel = this.model('comment');

    var powerOfUp = 100;
    let user = await userModel.where({ openid: openid }).find();
    if (!think.isEmpty(user)) {
      powerOfUp = user.power_of_up;
      if (user.power_of_up <= 0) {
        return;
      }
    }
    await userModel.where({ openid: openid }).update({
      power_of_up: (powerOfUp - 10)
    });
  }
}

