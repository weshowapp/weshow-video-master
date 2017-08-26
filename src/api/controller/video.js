'use strict';

import Base from './base.js';

var fs = require('fs');
var path = require('path');
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    AppId: '1254157576',
    SecretId: 'AKIDd7NN7aukRr53lDOM3UhlaS6TdXBY8U3M',
    SecretKey: '',
});

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
    let creator_id = this.post('creator_id');
    let creator_account = this.post('creator_account');
    let creator_photo = this.post('creator_photo');
    let creator_name = this.post('creator_name');
    let creator_gender = this.post('creator_gender');
    let bucket = this.post('bucket');
    let region = this.post('region');
    let filename = this.post('filename');
	console.log(creator_id);
	console.log(creator_account);
	
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
	
	cos.sliceUploadFile({
            Bucket: bucket, /* 必须 */
            Region: region,
            Key: filename, /* 必须 */
            FilePath: file.path, /* 必须 */
            TaskReady: function (tid) {
				console.log(tid);
                //TaskId = tid;
            },
            onHashProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            },
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            },
        }, function (err, data) {
            console.log(err || data);
            fs.unlinkSync(file.path);
        });
	
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
	//console.log(user);
	var latBegin = latitude-0.003;
	var latEnd = latitude-1+1.003;
	var longBegin = longitude-0.003;
	var longEnd = longitude-1+1.003;
	var startTime = create_time-7200;
	var endTime = create_time-3600+14400;
	console.log(endTime);
	let news = await this.model('news').where({latitude: ['between',latBegin,latEnd],
	                                           longitude: ['between',longBegin,longEnd],
	                                           start_time: ['<=',create_time],
	                                           end_time: ['>=',create_time-100]}).find();
	if (think.isEmpty(news)) {
	    let newsResult = await this.model('news').add({
            title: title,
            create_time: create_time,
            start_time: startTime,
            end_time: endTime,
            longitude: longitude,
            latitude: latitude,
            location: address
        });
	    console.log(newsResult);
		news = await this.model('news').where({latitude: ['between',latBegin,latEnd],
	                                           longitude: ['between',longBegin,longEnd],
	                                           start_time: ['<=',create_time],
	                                           end_time: ['>=',create_time-100]}).find();
		if (think.isEmpty(news)) {
	        console.log('Empty');
			return this.success({
                result: 'fail',
	            errorCode: 1002
            });
		}
	}
	console.log(news);
	
	let videoResult = await this.model('video').add({
        creator: user.id,
        title: title,
        news_id: news.id,
        create_time: create_time,
		upload_time: parseInt(new Date().getTime() / 1000),
        longitude: longitude,
        latitude: latitude,
		poster_url: 'http://hhvr3whp728i1txm4kv.exp.bcevod.com/mda-hhwx69cpbh8sqxn1/mda-hhwx69cpbh8sqxn1.jpg',
        video_url: fileUrl
    });
	console.log(videoResult);

    //this.display();
	return this.success({
      result: 'OK',
	  errorCode: 0
    });
  }
}