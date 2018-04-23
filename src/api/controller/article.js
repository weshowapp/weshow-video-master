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
  async indexAction() {
    let id = this.post('id');
    let size = this.post('size');
    let filter = this.post('filter');
    let tm = this.post('tm');
    if (!this.checkTimeStamp(tm)) {
      return this.success({
        result: 'OK',
        errorCode: 0
      });
    }
    if (id == '' || id == undefined || id == null || id == NaN) {
      id = 0;
    }
    if (size == '' || size == undefined || size == null || size == NaN) {
      size = 10;
    }
    if (filter == '' || filter == undefined || filter == null || filter == NaN) {
      filter = 0;
    }
    let list = await this.model('article').where({id: [">=", id], filter: filter}).limit(size).select();
    var tk = this.post('wxtoken');
    this.assign({'quest_list': list, 'wxtoken': tk});
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
    let list = await this.model('article').find().limit(30);
    if (!think.isEmpty(list)) {
        //console.log(list);
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
