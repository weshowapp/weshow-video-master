'use strict';

import Base from './base.js';

var fs = require('fs');
var path = require('path');


export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let videos = await this.model('video').limit(10).select();

    return this.success({
      videoList: videos
    });

  }

  async addAction() {
    let title = this.post('title');
    let field_id = this.post('field_id');
    let create_time = this.post('create_time');
    let longitude = this.post('longitude');
    let latitude = this.post('latitude');
    let address = this.post('address');
    let video_url = this.post('video_url');
    let poster_url = this.post('poster_url');
    let creator_id = this.post('creator_id');
    let creator_account = this.post('creator_account');
    let creator_photo = this.post('creator_photo');
    let creator_name = this.post('creator_name');
    let creator_gender = this.post('creator_gender');
    let creator_level = this.post('creator_level');
    console.log(creator_id);
	
	if (creator_level == 1 || creator_level == '1') {
      var rand = Math.round(Math.random() * 16);
	  creator_id = '100' + rand;
	  creator_photo = 'https://wx.ibobcat.com/static/user/avatar/photo' + rand + '.png';
	  creator_name = '名' + rand;
	}

    var result = await this.model('video').addVideo(title, field_id, create_time, longitude, latitude, address, video_url, poster_url,
      creator_id, creator_account, creator_photo, creator_name, creator_gender);
	  
    return this.success({
      result: 'OK',
	  video_id: result,
      errorCode: result
    });
  }

  async deleteAction() {
    var vid = this.post('vid');
    console.log(vid);
	
	var video = await this.model('video').where({id: vid}).find();
	var news_id = video.news_id;

    await this.model('video').where({id: vid}).delete();

	var videoList = await this.model('video').where({news_id: news_id}).select();
	if (think.isEmpty(videoList)) {
	  var news = await this.model('news').where({id: news_id}).delete();
	}

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async deletefieldAction() {
    var field_id = this.post('field_id');
    console.log(field_id);
	
	var video = await this.model('video').where({field_id: field_id}).find();
	var news_id = video.news_id;

    await this.model('video').where({field_id: field_id}).delete();

	var videoList = await this.model('video').where({news_id: news_id}).select();
	if (think.isEmpty(videoList)) {
	  var news = await this.model('news').where({id: news_id}).delete();
	}

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async updateposterAction() {
    //var vid = this.post('vid');
    var field_id = this.post('field_id');
    var poster_url = this.post('poster_url');
    console.log(field_id);
    console.log(poster_url);

    await this.model('video').where({field_id: field_id}).update({
      poster_url: poster_url.replace('http://', 'https://')
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async updateurlAction() {
    //var vid = this.post('vid');
    var field_id = this.post('field_id');
    var video_url = this.post('video_url');
    console.log(field_id);
    console.log(video_url);

    await this.model('video').where({field_id: field_id}).update({
      video_url: video_url.replace('http://', 'https://')
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

  async likeAction() {
    var vid = this.post('vid');
    var field_id = this.post('field_id');
    var creator_id = this.post('creator_id');
    var create_time = this.post('create_time');
	
    console.log(creator_id);

    var result = await this.model('like').add({
        creator: creator_id,
        video_id: vid,
        create_time: create_time
    });

    return this.success({
      result: 'OK',
	  video_id: result,
      errorCode: result
    });
  }

  async uploadAction() {
    //这里的 key 需要和 form 表单里的 name 值保持一致
    var file = think.extend({}, this.file('video'));
    var uploadurl = this.post('uploadurl');
	var sign = this.post('sign');
	console.log(uploadurl);
	console.log(sign);

    var filepath = file.path;
	console.log(filepath);

    //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
    var uploadPath = think.RESOURCE_PATH + '/static';
    think.mkdir(uploadPath);
    var basename = path.basename(filepath);
    fs.renameSync(filepath, uploadPath + '/' + basename);

    file.path = uploadPath + '/' + basename;

    if(think.isFile(file.path)){
      console.log('is file')
    }else{
      console.log('not exist')
    }

    this.assign('fileInfo', file);
	console.log(file.path);
	
	var fileUrl = "http://47.93.241.248/static/" + basename;
	console.log(fileUrl);

    var params = {
      'op': 'upload',
	  'Authorization': sign
    };
    var url = await this.model('video').qcloudUploadFile(basename, file.path);
	//var url = await this.model('video').qcloudUploadVideo(uploadurl, file.path, params);
	console.log('url');
	console.log(url);
	console.log('url');

    //this.display();
	return this.success({
	  fileurl: url,
      result: 'OK',
	  errorCode: 0
    });
  }
}