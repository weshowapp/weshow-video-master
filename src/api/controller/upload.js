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
    this.assign({'data_list': list, 'wxtoken': tk});
    this.display();
  }

  async queryinputAction() {
    let sql = this.post('quest_sql');
    let tm = this.post('tm');
    if (!this.checkTimeStamp(tm)) {
      return this.success({
        result: 'OK',
        errorCode: 0
      });
    }

    let list = await this.model('question').query(sql);
    if (!think.isEmpty(list)) {
        //console.log(list);
    }

    this.assign('result', list);
    this.display();
  }

  async uploadAction() {
    var file = think.extend({}, this.file('file_input'));
    var filepath = file.path;

    let tm = this.post('tm');
    if (!this.checkTimeStamp(tm)) {
      return this.success({
        result: 'OK',
        errorCode: 0
      });
    }

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(filepath, {encoding: 'UTF-8'})
    });

    var add_tm = this.getCurrentTime();
    var count = 0;
    let questModel = this.model('article');
    await lineReader.on('line', function (line) {
      if(!line) return;
      var arr = line.split('\",\"');

      var rawdata = arr[10];
      if (rawdata != null && rawdata.length > 0) {
        rawdata = rawdata.substr(0, arr[10].length-1);
      }
      let addResult = questModel.add({
        type: 1,
        level: 1,
        filter: 0,
        category0: 'category0',
        category1: 'category1',
        category2: 'category2',
        category3: 'category3',
        tags: 'tags',
        creator_id: '1',
        author_name: arr[6],
        author_id: '1',
        source_id: '1',
        source_name: arr[3],
        source_url: arr[8],
        pub_time_str: arr[2],
        pub_time: 0,
        share_time: 0,
        add_time: add_tm,
        title: arr[0].substring(1),
        digest: arr[1],
        content: arr[4],
        rawtext: arr[9],
        rawdata: rawdata,
        note: arr[7],
        more: 'more'
      });
      if (addResult > 0) {
        count++;
      }
    });

    /*var uploadPath = think.RESOURCE_PATH + '/upload';
    think.mkdir(uploadPath);
    var basename = path.basename(filepath);
    fs.renameSync(filepath, uploadPath + '/' + basename);
    file.path = uploadPath + '/' + basename;

    if(think.isFile(file.path)){
      console.log('is file')
    }else{
      console.log('not exist')
    }*/

    this.assign('result', 'Success Add ' + count + ' Lines');

    this.display();
  }

  async webaddAction() {
    return await this.addAction();
  }

  async addAction() {
    let type = this.post('type');
    let level = this.post('level');
    let category0 = this.post('category0');
    let category1 = this.post('category1');
    let category2 = this.post('category2');
    let category3 = this.post('category3');
    let tags = this.post('tags');
    let creator_id = this.post('creator_id');
    let author_name = this.post('author_name');
    let author_id = this.post('author_id');
    let source_id = this.post('source_id');
    let source_name = this.post('source_name');
    let source_url = this.post('source_url');
    let pub_time_str = this.post('pub_time_str');
    let pub_time = this.post('pub_time');
    let share_time = this.post('share_time');
    //let create_time = this.post('create_time');
    let add_time = this.getCurrentTime();
    let title = this.post('title');
    let digest = this.post('digest');
    let content = this.post('content');
    let note = this.post('note');
    let more = this.post('more');
    console.log('addAction');

    let addResult = await this.model('article').add({
        type: type,
        level: level,
        filter: 0,
        category0: category0,
        category1: category1,
        category2: category2,
        category3: category3,
        tags: tags,
        creator_id: creator_id,
        author_name: author_name,
        author_id: author_id,
        source_id: source_id,
        source_name: source_name,
        source_url: source_url,
        pub_time_str: pub_time_str,
        pub_time: pub_time,
        share_time: share_time,
        add_time: add_time,
        title: title,
        digest: digest,
        content: content,
        note: note,
        more: more
    });

    return this.success({
      result: 'OK',
      id: addResult,
      errorCode: 0
    });
  }

  async updateAction() {
    let type = this.post('type');
    let level = this.post('level');
    let category0 = this.post('category0');
    let category1 = this.post('category1');
    let category2 = this.post('category2');
    let category3 = this.post('category3');
    let tags = this.post('tags');
    let creator_id = this.post('creator_id');
    let author_name = this.post('author_name');
    let author_id = this.post('author_id');
    let source_id = this.post('source_id');
    let source_name = this.post('source_name');
    let source_url = this.post('source_url');
    let pub_time_str = this.post('pub_time_str');
    let pub_time = this.post('pub_time');
    let share_time = this.post('share_time');
    //let create_time = this.post('create_time');
    let add_time = this.getCurrentTime();
    let title = this.post('title');
    let digest = this.post('digest');
    let content = this.post('content');
    let note = this.post('note');
    let more = this.post('more');
    console.log('updateAction');

    let dataResult = await this.model('question').where({id: id}).update({
        type: type,
        level: level,
        filter: 0,
        category0: category0,
        category1: category1,
        category2: category2,
        category3: category3,
        tags: tags,
        creator_id: creator_id,
        author_name: author_name,
        author_id: author_id,
        source_id: source_id,
        source_name: source_name,
        source_url: source_url,
        pub_time_str: pub_time_str,
        pub_time: pub_time,
        share_time: share_time,
        add_time: add_time,
        title: title,
        digest: digest,
        content: content,
        note: note,
        more: more
    });

    return this.success({
      result: 'OK',
      id: dataResult,
      errorCode: 0
    });
  }

  async deleteAction() {
    let id = this.post('id');
    let str = this.post('delete');
    console.log('delete ' + id + ',' + str);
    if (id == '') {
      var arr = str.split(':');
      if (arr.length > 1) {
        id = arr[1];
      }
    }
    let result = await this.model('article').where({id: id}).delete();

    return this.success({
      result: result
    });
  }
}
