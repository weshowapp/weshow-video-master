'use strict';

export default class extends think.controller.base {

  /**
   * 前置操作
   */
  async __before() {

    //根据token值获取用户id
    think.token = this.header('X-Weshow-Token') || '';
    let TokenSerivce = this.service('token');
    let tokenObj = new TokenSerivce();
    think.userId = await tokenObj.getUserId();

    const publicController = this.http.config('publicController');
    const publicAction = this.http.config('publicAction');

    //如果为非公开，则验证用户是否登录
    console.log(this.http.controller + '/' + this.http.action)
    if (!publicController.includes(this.http.controller) && !publicAction.includes(this.http.controller + '/' + this.http.action)) {
      if (think.userId <= 0) {
        return this.fail(401, '请先登录');
      }
    }

  }
  
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

  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }

  getFullDateTime(time) {
    let date = new Date(time * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
    //return year + '-' + month + '-' + day + ' ' + this.formatNumber(hour) + ':' + this.formatNumber(minute) + ':' + this.formatNumber(second);
  }

  getCurrentTime() {
    var curTime = Math.round((new Date()).getTime() / 1000);
    return curTime;
  }
}