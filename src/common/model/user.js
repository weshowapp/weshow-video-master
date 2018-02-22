'use strict';

var wxconst = require('../../api/controller/wxconst');

/**
 * model
 */
export default class extends think.model.base {

  /**
   * Gen random string
   */
  randomString(len) {
    var s= '';
    var randomchar = function() {
      var n = Math.floor(Math.random() * 56);
      if (n < 10) return n; //1-10
      //if (n < 36) return String.fromCharCode(n + 55); //A-Z
      return String.fromCharCode(n + 55); //a-z
    }
    while(s.length < len) {
      s += randomchar();
    }
    return s;
  }

  async updateRelive(userid, add, relive, quizid, invitee_id) {
    console.log('updateRelive');
    var result = -1;
    let existInfo = await this.model('relive').where({ openid: userid, quizid: quizid, invitee_id: invitee_id }).find();
    if (!think.isEmpty(existInfo)) {
      return result;
    }
    let userInfo = await this.model('user').where({openid: userid}).find();
    if (!think.isEmpty(userInfo)) {
      if (add == wxconst.RELIVE_ADD) {
        result = await this.model('user').where({openid: userid}).increment('relive', relive);
      }
      else {
        result = await this.model('user').where({openid: userid}).decrement('relive', relive);
      }
      if (think.isEmpty(existInfo)) {
        var addTime = Math.round((new Date()).getTime() / 1000);
        let addResult = await this.model('relive').add({
          openid: userid,
          quizid: quizid,
          invitee_id: invitee_id,
          increase: add,
          add_time: addTime
        });
      }
    }
    return result;
  }
}