'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let quiz_id = this.get('quiz_id');
    let list = await this.model('quiz').where({id: quiz_id}).find();
	if (!think.isEmpty(list)) {
        console.log(list);
		//for (var i = 0; i < list.length; i++) {
            //console.log(i);
		    var questArr = [];
			var arr = list.questions.split('-');
		    for (var j = 0; j < arr.length; j++) {
				var quest_id = arr[j];
                console.log(quest_id);
				let questItem = await this.model('question').where({id: quest_id}).find();
				questItem.answered = -1;
				questArr.push(questItem);
			}
			list.quest_array = questArr;
		//}
	}

    return this.success({
      quizList: list
    });

  }

  async addAction() {
    let title = this.post('title');
    let create_time = this.post('create_time');
    let creator_id = this.post('creator_id');
    let creator_account = this.post('creator_account');
    let creator_level = this.post('creator_level');
    let quiz_level = this.post('quiz_level');
    let quiz_category = this.post('quiz_category');
    let quest_count = this.post('question_count');
    let price = this.post('price');
    let start_time = this.post('start_time');
    console.log(quest_count);
	
	var sql = 'SELECT * FROM ' + '\'question\'' + ' WHERE id >= (SELECT floor(RAND() * ((SELECT MAX(id) FROM '
	    + '\'question\'' + ') - (SELECT MIN(id) FROM ' + '\'question\'' + ')) + (SELECT MIN(id) FROM '
		+ '\'question\'' + '))) ORDER BY id LIMIT 1;';
	var list = await this.model('question').query(sql);
    console.log(list);
	//var randId = maxid * random();
    //console.log(randId);
	
	//let list = await this.model('question').where({id: randId}).limit(quest_count).select();
	if (think.isEmpty(list)) {
	}
	
		let questList = '';
		for (var i = 0; i < list.length; i++) {
			questList = questList + '-' + list[i].id;
		}
		let quizResult = await this.model('quiz').add({
            title: title,
            create_time: create_time,
            start_time: startTime,
			questions: questList,
			quest_count: quest_count,
			price: price
        });
	
	return this.success({
      result: 'OK',
	  quiz_id: result,
      errorCode: result
    });
  }
}
