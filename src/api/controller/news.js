'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * 获取分类栏目数据
   * @returns {Promise.<Promise|void|PreventPromise>}
   */
  async indexAction(){

    let news = await this.model('news').limit(30).select();
    let videos = await this.model('video').where({id: 1}).select();
    let users = await this.model('user').where({id: 1}).select();

    return this.success({
        newsList: news,
        videoList: videos,
        userList: users
    });
    // return this.success(jsonData);
  }
}