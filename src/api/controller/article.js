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
    let openid = this.get('openid');
    let nextid = this.get('nextid');
    let data = await this.model('article').where({id: id}).find();
    if (!think.isEmpty(data)) {
        await this.model('article').setMagazine(data);
        await this.model('article').setLikeList(data, openid);
        data.pub_time_str = this.model('article').getCurTimeStamp(data.pub_time);
        var nextdata = await this.model('article').where({id: nextid}).find();
        if (!think.isEmpty(nextdata)) {
          data.next_title = nextdata.title;
          data.next_digest = nextdata.digest;
        }
        data.openid = openid;
    }
    var tk = this.post('wxtoken');
    this.assign({'data': data, 'wxtoken': tk});
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
    let page = this.get('page');
    let type = this.get('type');
    let lasttm = this.get('lasttm');
    let size = this.get('size');
    if (size == '' || size == undefined || size == null || size == NaN) {
      size = 15;
    }
    if (lasttm == '' || lasttm == undefined || lasttm == null || lasttm == NaN) {
      lasttm = 0;
    }
    if (lasttm == 0) {
      lasttm = this.getCurrentTime();
    }
    let list = await this.model('article').where({pub_time: ["<", lasttm]}).order('pub_time DESC').limit(15).select();
    if (!think.isEmpty(list)) {
      //console.log(list);
      for (var i = 0; i < list.length; i++) {
        await this.model('article').setMagazine(list[i]);
        await this.model('article').setLikeList(list[i], openid);
        list[i].pub_time_str = this.model('article').getCurTimeStamp(list[i].pub_time);
      }
    }
    return this.success({
      newsList: list
    });
  }

  async getuserlikesAction() {
    let openid = this.get('openid');
    var likeList = await this.model('comment').field('artid').where({openid: openid, up: 1}).limit(15).select();
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
        list[i].pub_time_str = this.model('article').getCurTimeStamp(list[i].pub_time);
      }
    }
    return this.success({
      newsList: list
    });
  }

  async getbysourceAction() {
    let openid = this.get('openid');
    let srcname = this.get('sourcename');
    let list = await this.model('article').where({'source_name': srcname}).limit(15).select();
    if (!think.isEmpty(list)) {
      //console.log(list);
      for (var i = 0; i < list.length; i++) {
        await this.model('article').setMagazine(list[i]);
        await this.model('article').setLikeList(list[i], openid);
        list[i].pub_time_str = this.model('article').getCurTimeStamp(list[i].pub_time);
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
