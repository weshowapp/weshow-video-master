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

    var filepath = file.path;
	console.log(file);
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

    this.display();
  }
}