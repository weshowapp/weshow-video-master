'use strict';

import Base from './base.js';

var fs = require('fs');
//var path = require('path');

var xwords = require('./xwords');


export default class extends Base {


  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    this.display();
  }

  async getbyidAction() {
    let quest_id = this.get('question_id');
    let list = await this.model('question').where({id: quest_id}).find();
    if (!think.isEmpty(list)) {
        console.log(list);
    }

    return this.success({
      questList: list
    });
  }

  async uploadAction() {
    var file = think.extend({}, this.file('file_input'));
    var filepath = file.path;
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(filepath, {encoding: 'UTF-8'})
    });

    var count = 0;
    let questModel = this.model('question');
    lineReader.on('line', function (line) {
      if(!line) return;
      var arr = line.split(',');

      var item_count = 3;
      if (arr[7] != '') {
        item_count = 4;
      }

      let addResult = questModel.add({
        title: 'A',
        creator_id: '1',
        creator_name: 'Administrator',
        item_count: item_count,
        type: arr[1] == 'A' ? 1 : 2,
        source: arr[2],
        content: arr[3],
        item0: arr[4],
        item1: arr[5],
        item2: arr[6],
        item3: arr[7],
        answer: arr[8] == 'A' ? 0 : (arr[8] == 'B' ? 1 : (arr[8] == 'C' ? 2 : 3)),
        note: arr[9],
        more: arr[10],
        category0: arr[11],
        category1: arr[12],
        category2: arr[13],
        category3: arr[14],
        tags: arr[15],
        level: arr[16]
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

  async getbyuserAction() {
    let creator_id = this.get('creator_id');
    let list = await this.model('question').where({creator_id: creator_id}).select();
    if (!think.isEmpty(list)) {
        console.log(list.length);
    }

    return this.success({
      questList: list
    });

  }
  
  async getrandomAction() {
    let count = this.get('count');
    
    /*var table = 'weshow_question';
    var sql = 'SELECT * FROM ' + table + ' WHERE id >= (SELECT floor(RAND() * ((SELECT MAX(id) FROM '
        + table + ') - (SELECT MIN(id) FROM ' + table + ')) + (SELECT MIN(id) FROM '
        + table + '))) ORDER BY id LIMIT ' + count + ';';
    var list = await this.model('question').query(sql);
    console.log(list.length);*/

    let list = await this.model('question').field('id').where({type: 2}).select();
    if (!think.isEmpty(list)) {
      console.log(list.length);
      var arr = [];
      var first = Math.random(list.length);
      for (var i = first; i < list.length; i++) {
        console.log(i + ', ' + list[i]);
        if (arr.length < count) {
          arr.push(list[i]);
        }
        else {
          break;
        }
        if (i == list.length - 1) {
          i = 0;
        }
      }

      console.log(arr);
      let questList = await this.model('question').where({id: ["IN", arr]}).select();
      return this.success({
        questList: questList
      });
    }

    return this.fail({
      result: 'QUESTION EMPTY',
      errorCode: 401
    });

  }

  async auditxwordAction() {
    let content = this.get('content');
    var swords = xwords.filter(content);
    return this.success({
      result: 'OK',
      xwords: swords,
      errorCode: 0
    });
  }
 
  async addAction() {
    let title = this.post('title');
    let creator_id = this.post('creator_id');
    let creator_name = this.post('creator_name');
    let creator_account = this.post('creator_account');
    let creator_level = this.post('creator_level');
    let quest_content = this.post('quest_content');
    let quest_item_a = this.post('quest_item_a');
    let quest_item_b = this.post('quest_item_b');
    let quest_item_c = this.post('quest_item_c');
    let quest_item_d = this.post('quest_item_d');
    let item_count = this.post('item_count');
    let quest_answer = this.post('quest_answer');
    let type = this.post('quest_type');
    let level = this.post('quest_level');
    let tags = this.post('quest_tags');
    let source = this.post('quest_source');
    let note = this.post('note');
    //let create_time = this.post('create_time');
    let create_time = Math.round((new Date()).getTime() / 1000);
    console.log('addAction');
    //console.log(quest_content);
    if (quest_content == '' || quest_item_a == '' || quest_item_b == ''
         || quest_item_c == ''|| quest_answer == '') {
      return this.fail({
        result: 'INVALID_INPUT',
        audit: false,
        errorCode: 302
      });
    }

    //var audit = this.model('question').checkInput(quest_content, quest_item_a, quest_item_b, quest_item_c, quest_item_d);
    //if (!audit) {
    var swords = xwords.filter(quest_content) + xwords.filter(quest_item_a) + xwords.filter(quest_item_b)
         + xwords.filter(quest_item_c) + xwords.filter(quest_item_d);
    console.log(swords);
    //if (xwords.filter(quest_content) || xwords.filter(quest_item_a) || xwords.filter(quest_item_b)
    //     || xwords.filter(quest_item_c) || xwords.filter(quest_item_d)) {
    if (swords != '') {
      return this.fail({
        result: 'AUDIT_ERROR',
        audit: false,
        sword: swords,
        errorCode: 301
      });
    }

    let questResult = await this.model('question').add({
        title: title,
        creator_id: creator_id,
        creator_name: creator_name,
        create_time: create_time,
        content: quest_content,
        item_count: item_count,
        item0: quest_item_a,
        item1: quest_item_b,
        item2: quest_item_c,
        item3: quest_item_d,
        answer: quest_answer,
        type: type,
        level: level,
        tags: tags,
        source: source,
        note: note
    });

    return this.success({
      result: 'OK',
      question_id: questResult,
      errorCode: 0
    });
  }
}
