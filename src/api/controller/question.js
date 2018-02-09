'use strict';

import Base from './base.js';


var xwords = require('./xwords');

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let quest_id = this.get('question_id');
    let list = await this.model('question').where({id: quest_id}).find();
	if (!think.isEmpty(list)) {
        console.log(list);
	}

    return this.success({
      questList: list
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
    
	var table = 'weshow_question';
	var sql = 'SELECT * FROM ' + table + ' WHERE id >= (SELECT floor(RAND() * ((SELECT MAX(id) FROM '
	    + table + ') - (SELECT MIN(id) FROM ' + table + ')) + (SELECT MIN(id) FROM '
		+ table + '))) ORDER BY id LIMIT ' + count + ';';
	var list = await this.model('question').query(sql);
    console.log(list.length);

    return this.success({
      questList: list
    });

  }

  async auditxwordAction() {
    let content = this.post('content');
	var swords = xwords.filter1(content);
	return this.success({
      result: 'OK',
	  xwords: swords,
      errorCode: 0
    });
  }
 
  async addAction() {
    let title = this.post('title');
    let create_time = this.post('create_time');
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
    let note = this.post('note');
    console.log('addAction');
    console.log(quest_content);

    //var audit = this.model('question').checkInput(quest_content, quest_item_a, quest_item_b, quest_item_c, quest_item_d);
    //if (!audit) {
    var swords = xwords.filter(quest_content) + xwords.filter(quest_item_a) + xwords.filter(quest_item_b)
         + xwords.filter(quest_item_c) + xwords.filter(quest_item_d);
    console.log(swords);
    //if (xwords.filter(quest_content) || xwords.filter(quest_item_a) || xwords.filter(quest_item_b)
    //     || xwords.filter(quest_item_c) || xwords.filter(quest_item_d)) {
    /*if (swords != '') {
      return this.fail({
        result: 'AUDIT_ERROR',
        audit: false,
		sword: swords,
        errorCode: 301
      });
	}*/

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
			note: note
        });
	
	return this.success({
      result: 'OK',
	  question_id: questResult,
      errorCode: 0
    });
  }
}
