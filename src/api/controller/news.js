'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * 获取News列表
   * @returns {Promise.<Promise|void|PreventPromise>}
   */
  async indexAction(){

    let newsQuery = this.model('news');
    let news = await newsQuery.order({'create_time': 'desc'}).limit(30).select();
	if (!think.isEmpty(news)) {
	    let itemKey = 0;
		//var cur = new Date();
		for (let newsItem of news) {
			/*//let videos1 = await this.model('video').join('user ON video.creator=user.id').where({news_id: newsItem.id}).order({'create_time': 'asc'}).select();
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
				news[itemKey].updateDescrip = videos[0].creator_name + '于' + (videos[videos.length - 1].create_time) + '更新了进展';
			}
			else if (videos.length > 0) {
				news[itemKey].updateDescrip = videos[0].creator_name + '于' + (videos[0].create_time) + '最先发布';
			}
			news[itemKey].video_list = videos;

			let users = await this.model('video').where({news_id: newsItem.id}).getField('creator', 10);
			news[itemKey].creatorDescrip = '';
			if (!think.isEmpty(users)) {
				let creatorList = await this.model('user').where({'id': {'in': users}}).select();
				news[itemKey].creator_list = creatorList;
				if (creatorList.length > 1) {
					news[itemKey].creatorDescrip = creatorList[0].name + '等' + creatorList.length + '人共同拍摄';
				}
			}
			
			news[itemKey].showVideo = false;
			news[itemKey].curIndex = 0;*/
			
            //if (cur.getTime() / 1000 - newsItem.create_time < 300) {
              //continue;
            //}
			news[itemKey] = await newsQuery.getNewsDetail(news[itemKey]);
			itemKey += 1;
		}
	}

    return this.success({
        newsList: news
    });
    // return this.success(jsonData);
  }
  
  /**
   * 获取News Detail
   * @returns {Promise.<Promise|void|PreventPromise>}
   */
  async detailAction(){

    let newsId = this.get('newsid');
    let newsQuery = this.model('news');
    let news = await newsQuery.where({id: newsId}).select();
	if (!think.isEmpty(news)) {
		news = await newsQuery.getNewsDetail(news[0]);
	    /*let videos = await this.model('video').where({news_id: news.id}).order({'create_time': 'asc'}).select();
		for (let i = 0; i < videos.length; i++) {
			let user = await this.model('user').where({id: videos[i].creator}).select();
			if (!think.isEmpty(user)) {
			    videos[i].creator_name = user[0].name;
			    videos[i].creator_photo = user[0].photo_url;
			}
			//videos[i].create_time = think.datetime(new Date(videos[i].create_time * 1000));
			videos[i].create_time = this.formatDateTime(videos[i].create_time);
			let comments = await this.model('comment').where({video_id: videos[i].id}).select();
			videos[i].comments = comments;
			videos[i].comment = comments.length;
		}
		if (videos.length > 1) {
			news.updateDescrip = videos[0].creator_name + '于' + (videos[videos.length - 1].create_time) + '更新了进展';
		}
		else if (videos.length > 0) {
			news.updateDescrip = videos[0].creator_name + '于' + (videos[0].create_time) + '最先发布';
		}
		news.video_list = videos;

		let users = await this.model('video').where({news_id: news.id}).getField('creator', 10);
		news.creatorDescrip = '';
		if (!think.isEmpty(users)) {
			let creatorList = await this.model('user').where({'id': {'in': users}}).select();
			news.creator_list = creatorList;
			if (creatorList.length > 1) {
				news.creatorDescrip = creatorList[0].name + '等' + creatorList.length + '人共同拍摄';
			}
		}
			
		news.showVideo = false;
		news.curIndex = 0;*/
	}

    return this.success({
        newsItem: news
    });
    // return this.success(jsonData);
  }
}