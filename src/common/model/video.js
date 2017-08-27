'use strict';

var https = require('https');
var util = require('util');
var path = require('path');

var fs = require('fs');
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    AppId: '1254157576',
    SecretId: 'AKIDd7NN7aukRr53lDOM3UhlaS6TdXBY8U3M',
    SecretKey: '',
});

var BOUNDARYPREFIX = 'wxmebn';

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
  
  async qcloudUploadFiles(filename, filepath) {
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
          console.log(data.Location);
          var url = 'http://' + data.Location;
          resolve(url.replace('cn-north', 'costj'));
        }
      });
    });
  }

  mkfield(field, value) {
    return util.format('Content-Disposition: form-data; name="%s"\r\n\r\n%s', field, value);
  }

  async qcloudUploadVideo(url, filepath, param) {
	return new Promise(function (resolve, reject) {
	fs.readFile(filepath, function (err, filedata) {
      var content = util.format('Content-Disposition: form-data; name="filecontent"; filename="%s"\r\n', filepath);
      content += util.format('Content-Type: %s\r\n\r\n', 'multipart/form-data');
      content += filedata;
    
	  var data = [content];
	  for (var i in param) {
        data.push(util.format('Content-Disposition: form-data; name="%s"\r\n\r\n%s', i, param[i]));
      }
	  
	  var max = 9007196154740990;
      var dec = Math.random() * max;
      var hex = dec.toString(36);
      var boundary = BOUNDARYPREFIX + hex;

      var body = util.format('Content-Type: multipart/form-data; boundary=%s\r\n\r\n', boundary)
                 + util.format('--%s\r\n', boundary)
                 + data.join(util.format('\r\n--%s\r\n', boundary))
                 + util.format('\r\n--%s', boundary);

      //console.log(body);

      var parse_url = require('url').parse(url, true);
	  console.log(parse_url.hostname););
	  console.log(parse_url.path);
      var options = {
        host: parse_url.hostname,
        port: 443,
        path: parse_url.path,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Length': body.length
        }
      };

      https.request(options, function(resHttps) {
        console.log("statusCode: ", resHttps.statusCode);
        console.log("headers: ", resHttps.headers);

        resHttps.setEncoding('utf8');

        // write data to request body
        reqHttps.write(body);
        reqHttps.end();

        resHttps.on('data', function(body1) {
          console.log("data: " + body1);
		  resolve(body1);
        });

        reqHttps.on('error', function(e) {
          console.error("error:"+e);
          reject(e);
        });
      });
    });
	});
  }
}