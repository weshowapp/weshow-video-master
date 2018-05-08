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
    var popularity = 0;
    let user = await userModel.where({ openid: openid }).find();
    if (!think.isEmpty(user)) {
      powerOfUp = user.power_of_up;
      popularity = user.popularity;
      if (user.power_of_up <= 0) {
        powerOfUp = 0;
      }
    }
    await userModel.where({ openid: openid }).update({
      power_of_up: (powerOfUp - 10),
      popularity: popularity
    });
  }
}

