'use strict';

export default class extends think.model.base {
  
  /**
   * 根据时间格式化显示
   * @param time
   * @returns {string}
   */
  formatDateTime(time){
    let cur = new Date();
    let date = new Date(time * 1000);
    let out = "";
    let curTime = cur.getTime() / 1000;

    if (curTime - time < 3600) {
      out = Math.round((curTime - time) / 60) + '分钟前';
    }
    else if (curTime - time < 3600 * 24) {
      out = Math.round((curTime - time) / 3600) + '小时前';
    }
    else if (curTime - time < 3600 * 24 * 7) {
      out = (cur.getDay() - date.getDay()) + '天前';
    }
    else if (cur.getYear() == date.getYear()) {
      out = date.getMonth() + '月' + (date.getDay()+1) + '日';
    }
    else {
      out = date.getFullYear() + '/' + date.getMonth() + '/' + (date.getDay()+1);
    }
    return out;
  }
}