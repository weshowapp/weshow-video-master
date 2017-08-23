'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let comments = await this.model('comment').limit(10).select();

    return this.success({
      commentList: comments
    });

  }

  /**
   * add action
   * @return {Promise} []
   */
  async addAction() {
	let content = this.post('content');
    let type = this.post('type');
    let content_url = this.post('content_url');
    let video_id = this.post('video_id');
    let creator_id = this.post('creator_id');
    let creator_photo = this.post('creator_photo');
    let creator_name = this.post('creator_name');
    let creator_gender = this.post('creator_gender');
	console.log(creator_id);

    //let user = await this.model('user').where({photo_url: creator_photo, name: creator_name}).find();
    let user = await this.model('user').where({openid: creator_id}).find();
    if (think.isEmpty(user)) {
      let userResult = await this.model('user').add({
        gender: creator_gender,
        openid: creator_id,
        account: 'Wx'+creator_name,
        name: creator_name,
        photo_url: creator_photo,
        reg_time: parseInt(new Date().getTime() / 1000)
      });
      console.log(userResult);
      user = await this.model('user').where({photo_url: creator_photo, name: creator_name}).find();
	}
	
	let video = await this.model('video').where({id: video_id}).find();
	if (think.isEmpty(video)) {
	  return this.success({
        result: 'fail',
	    errorCode: 1001
      });
	}
	
	let addResult = await this.model('video').add({
      creator: user.id,
      video_id: video.id,
      content: content,
      create_time: create_time
    });
	console.log(addResult);

    this.display();
  }
}