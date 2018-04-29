'use strict';

/**
 * model
 */

var wxconst = require('../../api/controller/wxconst');


export default class extends think.model.base {

  getCurrentSecond() {
    return Math.floor((new Date()).getTime() / 1000);
  }

  getHourMin(time) {
    var cur = new Date();
    var curTime = cur.getTime() / 1000;
    var date = new Date(time * 1000);
    var hour = date.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = date.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    if (cur.getDate() != date.getDate()) {
      if (cur.getDate() - date.getDate() == -1) {
        return '明天' + ' ' + hour + ':' + min;
      }
      else if (cur.getDate() - date.getDate() == 1) {
        return '昨天' + ' ' + hour + ':' + min;
      }
      else if (cur.getDate() > date.getDate() && cur.getDate() - date.getDate() < 7) {
        return (cur.getDate() - date.getDate()) + '天前' + ' ' + hour + ':' + min;
      }
      return (date.getMonth() + 1) + '/' + date.getDate() + ' ' + hour + ':' + min;
    }
    return hour + ':' + min;
  }

  replaceAll(str, rep) {
    if (str!=null)
      str = str.replace(/word/g, rep)
      return str;
  }

  getUrl(imageData, len) {
    if (imageData != null && imageData.length > len) {
      var src = imageData[len - 1].match(/src=.*\" /i);
      if (src != null && src.length > 0) {
        return src[0].replace(/\"\"/g, '').replace(/src=/i, '');
      }
    }
    return '';
  }

}