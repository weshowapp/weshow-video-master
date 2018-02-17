'use strict';

import Base from './base.js';

var fs = require('fs');
//var path = require('path');

var xwords = require('./xwords');
var wxconst = require('./wxconst');


export default class extends Base {


  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let page = this.get('page');
    let size = this.get('size');
    if (page == undefined || page == null) {
      page = 0;
    }
    if (size == undefined || size == null) {
      page = 0;
    }
    let begin = parseInt(page) * parseInt(size);
    let list = await this.model('question').where({id: [">=", begin]}).limit(size).select();
    this.assign('quest_list', list);
    this.display();
  }

  async getbyidAction() {
    let quest_id = this.get('question_id');
    let list = await this.model('question').where({id: quest_id}).find();
    if (!think.isEmpty(list)) {
        //console.log(list);
    }

    return this.success({
      questList: list
    });
  }

  async queryinputAction() {
    let sql = this.post('quest_sql');
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
    
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(filepath, {encoding: 'UTF-8'})
    });

    var count = 0;
    let questModel = this.model('question');
    await lineReader.on('line', function (line) {
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
        type: arr[1] == 'A' ? wxconst.QUIZ_CATEGORY_PUBLIC_MIX : wxconst.QUIZ_CATEGORY_SELF,
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

  async getcategoryAction() {
    let openid = this.get('openid');

    return this.success({
      category_items: wxconst.QUESTION_CATEGORY_ITEMS
    });
  }

  async getrulesAction() {
    let openid = this.get('openid');

    return this.success({
      game_rules: wxconst.QUIZ_GAME_RULES
    });
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
    let openid = this.get('openid');

    let list = await this.model('question').getRandomList(count, wxconst.QUIZ_CATEGORY_SELF, wxconst.QUIZ_LEVEL_AUTO, openid);
    return this.success({
      questList: list
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
    var swords = xwords.block(quest_content) + xwords.block(quest_item_a) + xwords.block(quest_item_b)
         + xwords.block(quest_item_c) + xwords.block(quest_item_d);
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

    var filter = 0;
    var filterwords = xwords.filter(quest_content) + xwords.filter(quest_item_a) + xwords.filter(quest_item_b)
         + xwords.filter(quest_item_c) + xwords.filter(quest_item_d);
    console.log(filterwords);
    if (filterwords != '') {
      filter = 1;
      note = 'xwords:' + filterwords;
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
        filter: filter,
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
