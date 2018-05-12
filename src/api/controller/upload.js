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

  async bishijieinfoAction() {
    let startid = this.post('startid');
    let endid = this.post('endid');

    var exec = require('child_process').exec;
    exec('python py/bishijie.py ' + startid + ' ' + endid + ' ',
            function(error, stdout, stderr) {
      console.info('stdout : ' + stdout);
      if(error) {
        console.info('stderr : ' + stderr);
      }
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async lianxiangcjinfoAction() {
    let startid = this.post('startid');
    let endid = this.post('endid');

    var exec = require('child_process').exec;
    exec('python py/lianxiangcj.py ' + startid + ' ' + endid + ' ',
            function(error, stdout, stderr) {
      console.info('stdout : ' + stdout);
      if(error) {
        console.info('stderr : ' + stderr);
      }
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async ithomeAction() {
    let startid = this.post('startid');
    let endid = this.post('endid');

    var exec = require('child_process').exec;
    exec('python py/ithome.py ' + startid + ' ' + endid + ' ',
            function(error, stdout, stderr) {
      console.info('stdout : ' + stdout);
      if(error) {
        console.info('stderr : ' + stderr);
      }
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async wallstreetinfoAction() {
    let startid = this.post('startid');
    let endid = this.post('endid');

    var exec = require('child_process').exec;
    exec('python py/wallstreet.py ' + startid + ' ' + endid + ' ',
            function(error, stdout, stderr) {
      console.info('stdout : ' + stdout);
      if(error) {
        console.info('stderr : ' + stderr);
      }
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
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
    let artModel = this.model('article');
    let uploadModel = this.model('upload');
    await lineReader.on('line', function (line) {
      if(!line) return;
      var arr = line.split(',');

      var image0 = '';
      var image1 = '';
      var image2 = '';
      var image3 = '';
      var rawdata = arr[10];
      if (rawdata != null && rawdata.length > 0) {
        rawdata = rawdata.substr(0, arr[10].length-1);
        var imageData = rawdata.match(/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|png))?.+>/i);
        if (imageData != null && imageData.length > 1) {
          image0 = imageData[1];
          image0 = image0.replace(/\"/g, '');
          var validUrl = image0.match(/(.)+\.(jpg|gif|bmp|bnp|png)+./i);
          if (validUrl != null) {
            image0 = '';
          }
        }
        rawdata = rawdata.replace(/\"\"/g, '');
        rawdata = rawdata.replace(/<img/g, '<img width=100%');
        if (rawdata.substr(0, 1) == '\"') {
          rawdata = rawdata.substring(1);
        }
      }
      var pubTime = add_tm;
      var pubStr = arr[2];
      if (pubStr != null && pubStr.length > 0) {
        var tm = pubStr.match(/(.)+(分钟|小时|天)前/i);
        if (tm != null && tm.length > 2) {
          if (tm[2].indexOf('分钟') != -1) {
            pubTime = pubTime - parseInt(tm[1]) * 60;
          }
          else if (tm[2].indexOf('小时') != -1) {
            pubTime = pubTime - parseInt(tm[1]) * 60 * 60;
          }
          else if (tm[2].indexOf('天') != -1) {
            pubTime = pubTime - parseInt(tm[1]) * 60 * 60 * 24;
          }
        }
      }
      var title = arr[0];
      if (title.substr(0, 1) == '\"') {
        title = arr[0].substring(1);
      }
      var digest = arr[1];
      if (digest.substr(0, 1) == '\"') {
        digest = digest.substring(1);
      }
      var content = arr[4];
      if (content.substr(0, 1) == '\"') {
        content = content.substring(1);
      }
      var rawtext = arr[9];
      if (rawtext.substr(0, 1) == '\"') {
        rawtext = rawtext.substring(1);
      }
      var author = arr[6];
      if (author != null) {
        author = author.replace('作者：', '');
        author = author.replace('作者:', '');
      }
      let addResult = artModel.add({
        type: 1,
        level: 1,
        filter: 0,
        category0: 'category0',
        category1: 'category1',
        category2: 'category2',
        category3: 'category3',
        tags: 'tags',
        creator_id: '1',
        author_name: author,
        author_id: '1',
        source_id: '1',
        source_name: arr[3],
        source_url: arr[8],
        pub_time_str: arr[2],
        pub_time: pubTime,
        share_time: 0,
        add_time: add_tm,
        title: title,
        digest: digest,
        content: content,
        rawtext: rawtext,
        rawdata: rawdata,
        image0: image0,
        image1: image1,
        image2: image2,
        image3: image3,
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
    let rawtext = this.post('rawtext');
    let rawdata = this.post('rawdata');
    let image0 = this.post('image0');
    let image1 = this.post('image1');
    let image2 = this.post('image2');
    let image3 = this.post('image3');
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
        rawtext: rawtext,
        rawdata: rawdata,
        image0: image0,
        image1: image1,
        image2: image2,
        image3: image3,
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
    let rawtext = this.post('rawtext');
    let rawdata = this.post('rawdata');
    let image0 = this.post('image0');
    let image1 = this.post('image1');
    let image2 = this.post('image2');
    let image3 = this.post('image3');
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
        rawtext: rawtext,
        rawdata: rawdata,
        image0: image0,
        image1: image1,
        image2: image2,
        image3: image3,
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
