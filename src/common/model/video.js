'use strict';

var fs = require('fs');
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    AppId: '1254157576',
    SecretId: 'AKIDd7NN7aukRr53lDOM3UhlaS6TdXBY8U3M',
    SecretKey: '',
});

/**
 * model
 */
export default class extends think.model.base {

  // Add video record to tables
  async addVideo(title, create_time, longitude, latitude, address, video_url, poster_url,
      creator_id, creator_account, creator_photo, creator_name, creator_gender) {
    
    console.log(creator_id);
    console.log(video_url);

    //let user = await this.model('user').where({photo_url: creator_photo, name: creator_name}).find();
    let user = await this.model('user').where({openid: creator_id}).find();
    if (think.isEmpty(user)) {
      let userResult = await this.model('user').add({
        gender: creator_gender,
        openid: creator_id,
        account: creator_account,
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
			return 1002;
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
		poster_url: poster_url,
        video_url: video_url
    });
	console.log(videoResult);

    //this.display();
	return 0;
  }
  
  async qcloudUploadVideo(filename, filepath) {
    return new Promise(function (resolve, reject) {
      cos.sliceUploadFile({
        Bucket: 'test1',
        Region: 'cn-north',
        Key: filename,
        FilePath: filepath,
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
        fs.unlinkSync(filepath);
        if (err) {
          reject(err);
        } else {
          console.log(data.Lolcation);
          resolve(data.Location);
        }
      });
    });
  }
}