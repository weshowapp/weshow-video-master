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
      out = (curTime - time) / 60 + '分钟前';
    }
    else if (curTime - time < 3600 × 24) {
      out = (curTime - time) / 3600 + '小时前';
    }
    else if (curTime - time < 3600 × 24 × 7) {
      out = (curTime - time) / 3600 / 24 + '天前';
    }
    else if (cur.getYear() == date.getYear()) {
      out = date.getMonth() + '月' + date.getDay() + '日';
    }
    else {
      out = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDay() + '日';
    }
    return out;
  }
}