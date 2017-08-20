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
				//videos[i].create_time = think.datetime(new Date(videos[i].create_time * 1000));
				videos[i].create_time = this.formatDateTime(videos[i].create_time);
			}
			if (videos.length > 1) {
				news[itemKey].updateDescrip = videos[0].creator_name + '于' + this.formatDateTime(videos[0].create_time) + '更新了进展';
			}
			else if (videos.length > 0) {
				news[itemKey].updateDescrip = videos[0].creator_name + '于' + this.formatDateTime(videos[i].create_time) + '最先发布';
			}
			news[itemKey].video_list = videos;

			let users = await this.model('video').where({news_id: newsItem.id}).getField('creator', 10);
			let creatorList = await this.model('user').where({'id': {'in': users}}).select();
			news[itemKey].creator_list = creatorList;
			if (creatorList.length > 1) {
			    news[itemKey].creatorDescrip = creatorList[0].name + '等' + creatorList.length + '人共同拍摄';
			}
			else {
				news[itemKey].creatorDescrip = '';
			}
			
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