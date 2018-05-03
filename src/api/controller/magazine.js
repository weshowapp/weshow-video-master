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
    var likeScore = [30, 50, 60, 67, 73, 78, 82, 85, 87, 88];
    if (!think.isEmpty(list)) {
        console.log('magazine info');
        //await this.model('magazine').setMagazineDetail(list);
        var impact = 0;
        var artList = await this.model('article').where({'source_name': name}).select();
        if (!think.isEmpty(artList)) {
          list.article_count = artList.length;
          //console.log('magazine artList ' + artList.length);
          for (var i = 0; i < artList.length; i++) {
            //console.log('magazine artList[i] ' + artList[i].id);
            var cmCount = await this.model('comment').where({'artid': artList[i].id, up: 1}).count();
            //console.log('magazine cmCount ' + cmCount);
            if (cmCount == 0) {
            }
            else if (cmCount <= 10) {
              impact += likeScore[cmCount - 1];
            }
            else {
              impact += 88;
            }
            //console.log('magazine impact ' + impact);
          }
          list.impact = impact;
          //console.log('magazine list.impact ' + list.impact);
        }
    }

    return this.success({
      magazine: list
    });
  }

  async webaddAction() {
    return await this.addAction();
  }

  async addAction() {
    let name = this.post('name');
    let cover_url = this.post('cover_url');
    let description = this.post('description');
    let address = this.post('address');
    let impact = this.post('impact');
    let read_value = this.post('read_value');
    let read_count = this.post('read_count');
    let add_time = this.getCurrentTime();
    let note = this.post('note');

    let addResult = await this.model('magazine').add({
        name: name,
        cover_url: cover_url,
        description: description,
        address: address,
        impact: impact,
        read_value: read_value,
        read_count: read_count,
        add_time: add_time,
        note: note
    });

    return this.success({
      result: 'OK',
      id: addResult,
      errorCode: 0
    });
  }

  async updateAction() {
    let id = this.post('id');
    let name = this.post('name');
    let cover_url = this.post('cover_url');
    let description = this.post('description');
    let address = this.post('address');
    let impact = this.post('impact');
    let read_value = this.post('read_value');
    let read_count = this.post('read_count');
    let add_time = this.getCurrentTime();
    let note = this.post('note');

    let addResult = await this.model('magazine').where({id: id}).update({
        name: name,
        cover_url: cover_url,
        description: description,
        address: address,
        impact: impact,
        read_value: read_value,
        read_count: read_count,
        add_time: add_time,
        note: note
    });

    return this.success({
      result: 'OK',
      id: addResult,
      errorCode: 0
    });
  }
}
