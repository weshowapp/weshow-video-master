'use strict';

import Base from './base.js';

var fs = require('fs');
//var path = require('path');

var xwords = require('./xwords');
var wxconst = require('./wxconst');

var ppArray = [];

export default class extends Base {


  /**
   * index action
   * @return {Promise} []
   */
  async detailAction() {
    let id = this.get('id');
    let data = await this.model('article').where({id: id}).find();
    this.assign({'data': data});
    this.display();
  }

  async getbyidAction() {
    let art_id = this.get('art_id');
    let list = await this.model('article').where({id: art_id}).find();
    if (!think.isEmpty(list)) {
        //console.log(list);
    }

    return this.success({
      questList: list
    });
  }

  async getbyuserAction() {
    let openid = this.get('openid');
    let list = await this.model('article').limit(30).select();
    if (!think.isEmpty(list)) {
      //console.log(list);
      for (var i = 0; i < list.length; i++) {
        gidList.push(groupList[i].open_gid);
      }
    }
    return this.success({
      newsList: list
    });
  }

  async getrandomAction() {
    let count = this.get('count');
    let onlyself = this.get('onlyself');
    let openid = this.get('openid');
    let type = this.get('type');
    if (type == '' || type == undefined) {
      type = wxconst.QUIZ_CATEGORY_SELF;
    }

    let list = await this.model('article').getRandomList(count, type, openid, onlyself);
    return this.success({
      questList: list
    });
  }

}
