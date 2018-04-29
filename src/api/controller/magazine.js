'use strict';

import Base from './base.js';

var fs = require('fs');
//var path = require('path');

var xwords = require('./xwords');
var wxconst = require('./wxconst');

var ppArray = [];

export default class extends Base {

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
    let list = await this.model('magazine').where({id: [">=", id]}).limit(size).select();
    var tk = this.post('wxtoken');
    this.assign({'data_list': list, 'wxtoken': tk});
    this.display();
  }

  async infoAction() {
    let name = this.get('magazine_name');
    let list = await this.model('magazine').where({name: name}).find();
    if (!think.isEmpty(list)) {
        //console.log(list);
        //await this.model('magazine').setMagazineDetail(list);
        var artCount = await this.model('article').where({'source_name': name}).count();
        list.article_count = artCount;
    }

    return this.success({
      magazine: list
    });
  }


}
