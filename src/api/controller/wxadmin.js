'use strict';

import Base from './base.js';

var fs = require('fs');
var path = require('path');

var wxconst = require('./wxconst');


export default class extends Base {


  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let user = this.post('user');
    let pswd = this.post('pswd');
    /*let tm = this.post('tm');
    if (!this.checkTimeStamp(tm)) {
      return this.success({
        result: 'OK',
        errorCode: 0
      });
    }*/
    var tk = 'token';
    var login = false;
    if (user == 'user' && pswd == 'pswd') {
      login = true;
      tk = await this.createWxToken(1, 'WxAdmin0');
    }
    console.log(user + ',' + login + ',' + tk);
    this.http.header('X-Weshow-Token', tk);
    this.assign({'login': login, 'wxtoken': tk});
    this.display();
  }

  async uploadAction() {
    var file = think.extend({}, this.file('file_input'));
    var filepath = file.path;

    /*let tm = this.post('tm');
    if (!this.checkTimeStamp(tm)) {
      return this.success({
        result: 'OK',
        errorCode: 0
      });
    }*/

    var uploadPath = think.RESOURCE_PATH + '/upload';
    think.mkdir(uploadPath);
    var basename = path.basename(filepath);
    fs.renameSync(filepath, uploadPath + '/' + basename);
    file.path = uploadPath + '/' + basename;

    if (think.isFile(file.path)) {
      console.log('is file')
      this.assign('result', 'Success Upload 1 File.');
    } else {
      console.log('not exist')
      this.assign('result', 'Upload Failed.');
    }

    this.display();
  }

}
