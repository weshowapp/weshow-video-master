'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let feedbacks = await this.model('feedback').limit(100).select();

    return this.success({
      feedbacks: feedbacks
    });

  }

  /**
   * add action
   * @return {Promise} []
   */
  async addAction() {
	//console.log('addAction');
	let content = this.post('content');
    let create_time = this.post('create_time');
    let creator_id = this.post('creator_id');
    let creator_name = this.post('creator_name');
	//console.log(content);
	
	let addResult = await this.model('feedback').add({
      creator: creator_id,
      creator_name: creator_name,
      content: content,
      create_time: create_time
    });
	console.log(addResult);

    return this.success({
      result: 'OK',
	  errorCode: 0
    });
  }

}