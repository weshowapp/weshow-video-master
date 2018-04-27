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
        await this.model('article').setMagazine(list[i]);
        await this.model('article').setLikeList(list[i], openid);
      }
    }
    return this.success({
      newsList: list
    });
  }

  async getuserlikesAction() {
    let openid = this.get('openid');
    var likeList = await this.model('comment').field('artid').where({openid: openid, up: 1}).limit(30).select();
    var aidList = [];
    if (!think.isEmpty(likeList)) {
        for (var i = 0; i < likeList.length; i++) {
            aidList.push(likeList[i].artid);
        }
    }
    let list = await this.model('article').where({'id': ["IN", aidList]}).select();
    if (!think.isEmpty(list)) {
      //console.log(list);
      for (var i = 0; i < list.length; i++) {
        await this.model('article').setMagazine(list[i]);
        await this.model('article').setLikeList(list[i], openid);
      }
    }
    return this.success({
      newsList: list
    });
  }

  async getbysourceAction() {
    let openid = this.get('openid');
    let srcname = this.get('sourcename');
    let list = await this.model('article').where({'source_name': srcname}).limit(30).select();
    if (!think.isEmpty(list)) {
      //console.log(list);
      for (var i = 0; i < list.length; i++) {
        await this.model('article').setMagazine(list[i]);
        await this.model('article').setLikeList(list[i], openid);
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
