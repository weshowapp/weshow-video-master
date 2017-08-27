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
	
    console.log(creator_id);

    var result = await this.model('video').addVideo(title, field_id, create_time, longitude, latitude, address, video_url, poster_url,
      creator_id, creator_account, creator_photo, creator_name, creator_gender);
	  
    return this.success({
      result: 'OK',
	  video_id: result,
      errorCode: result
    });
  }
  
  async updateposterAction() {
    //var vid = this.post('vid');
    var field_id = this.post('field_id');
    var poster_url = this.post('poster_url');
    console.log(field_id);
    console.log(poster_url);

    await this.model('video').where({field_id: field_id}).update({
      poster_url: poster_url
    });

    return this.success({
      result: 'OK',
      errorCode: 0
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