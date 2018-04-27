'use strict';

import Base from './base.js';

var fs = require('fs');
//var path = require('path');

var xwords = require('./xwords');
var wxconst = require('./wxconst');

var ppArray = [];

export default class extends Base {


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
      questList: list
    });
  }


}
