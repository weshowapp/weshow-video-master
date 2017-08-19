'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * 获取分类栏目数据
   * @returns {Promise.<Promise|void|PreventPromise>}
   */
  async indexAction(){

    let newsQuery = this.model('news');
    let news = await newsQuery.limit(30).select();
	if (!think.isEmpty(news)) {
	    let itemKey = 0;
		for (let newsItem of news) {
			let videos = await this.model('video').where({news_id: newsItem.id}).select();
			for (let i = 0; i < videos.length; i++) {
				let user = await this.model('user').where({id: videos[i].creator}).select();
				if (!think.isEmpty(user)) {
				    videos[i].creator_name = user[0].name;
				    videos[i].creator_photo = user[0].photo_url;
				}
			}
			news[itemKey].video_list = videos;
			news[itemKey].showVideo = false;
			itemKey += 1;
		}
	}

    return this.success({
        newsList: news
    });
    // return this.success(jsonData);
  }
}