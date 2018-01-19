'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let quiz_id = this.get('quiz_id');
    let list = await this.model('video').where({id, quiz_id}).find();
	//let list = await this.model('video').limit(10).select();

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
    let quest_level = this.post('quiz_level');
    let quest_count = this.post('quest_count');
    let price = this.post('price');
    let start_time = this.post('start_time');
    console.log(creator_id);
	
	let list = await this.model('question').orderby(rand()).limit(quest_count).select();
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
