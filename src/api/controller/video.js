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

  async uploadAction(){
    //这里的 key 需要和 form 表单里的 name 值保持一致
    var file = think.extend({}, this.file('video'));
	let title = this.post('title');
    let create_time = this.post('create_time');
    let longitude = this.post('longitude');
    let latitude = this.post('latitude');
    let address = this.post('address');
    let creator_photo = this.post('creator_photo');
    let creator_name = this.post('creator_name');
    let creator_gender = this.post('creator_gender');
	console.log(create_time);
	
    var filepath = file.path;
	//console.log(file);
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
	
	let user = await this.model('user').where({photo_url: creator_photo, name: creator_name}).find();
	if (think.isEmpty(user)) {
	    let userResult = await this.model('user').add({
            gender: creator_gender,
            account: 'Wx'+creator_name,
            name: creator_name,
            photo_url: creator_photo,
            reg_time: parseInt(new Date().getTime() / 1000)
        });
	    console.log(userResult);
		user = await this.model('user').where({photo_url: creator_photo, name: creator_name}).find();
	}
	//console.log(user);
	var latBegin = latitude-0.003;
	var latEnd = latitude+0.003;
	var longBegin = longitude-0.003;
	var longEnd = longitude+0.003;
	let news = await this.model('news').where({latitude: {'between',latBegin,latEnd}, longitude: {'between',longBegin,longEnd}).find();
	if (think.isEmpty(news)) {
	    let newsResult = await this.model('news').add({
            title: title,
            create_time: create_time,
            longitude: longitude,
            latitude: latitude,
            location: address
        });
	    console.log(newsResult);
		news = await this.model('news').where({{latitude: {'between',latBegin,latEnd}, longitude: {'between',longBegin,longEnd}).find();
	}
	//console.log(news);
	
	let videoResult = await this.model('video').add({
        creator: user.id,
        title: title,
        news_id: news.id,
        create_time: create_time,
		upload_time: parseInt(new Date().getTime() / 1000),
        longitude: longitude,
        latitude: latitude,
		poster_url: 'https://dslb.cdn.krcom.cn/stream/zpUlK5EVJiDJIIrS1kfdgfIVaa4mkEuSjE6sZQ___32768.jpg',
        video_url: fileUrl
    });
	console.log(videoResult);

    this.display();
  }
}