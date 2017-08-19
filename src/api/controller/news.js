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
			//let videos1 = await this.model('video').join('user ON video.creator=user.id').where({news_id: newsItem.id}).order({'create_time': 'asc'}).select();
			let videos = await this.model('video').where({news_id: newsItem.id}).order({'create_time': 'asc'}).select();
			for (let i = 0; i < videos.length; i++) {
				let user = await this.model('user').where({id: videos[i].creator}).select();
				if (!think.isEmpty(user)) {
				    videos[i].creator_name = user[0].name;
				    videos[i].creator_photo = user[0].photo_url;
				}
			}
			if (!think.isEmpty(videos)) {
				news[itemKey].updateDescrip = videos[0].creator_name + 'Update at' + videos[0].creator_time;
			}
			news[itemKey].video_list = videos;

			let users = await this.model('video').where({news_id: newsItem.id}).getField('creator', 10);
			let creatorList = await this.model('user').where({'id': {'in': users}}).select();
			news[itemKey].creator_list = creatorList;
			
			news[itemKey].showVideo = false;
			news[itemKey].curIndex = 0;
			itemKey += 1;
		}
	}

    return this.success({
        newsList: news
    });
    // return this.success(jsonData);
  }
}