'use strict';

/**
 * model
 */

var wxconst = require('../../api/controller/wxconst');


export default class extends think.model.base {

  getCurrentSecond() {
    return Math.floor((new Date()).getTime() / 1000);
  }

  getCurTimeStamp(time) {
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
    else if (parseInt(hour) < cur.getHours()) {
      return (cur.getHours() - parseInt(hour)) + '小时前';
    }
    else if (parseInt(hour) < cur.getMinutes()) {
      return (cur.getMinutes() - parseInt(hour)) + '分钟前';
    }
    return '刚刚';
  }

  /**
   * Article的Detail
   * @param artid
   * @returns {Promise.<*>}
   */
  async setMagazine(article) {
    if (!think.isEmpty(article)) {
      console.log(article.id);
      var magz = await this.model('magazine').where({name: article.source_name}).find();
      if (!think.isEmpty(magz)) {
        article.magazine_url = magz.cover_url;
      }
    }
    return article;
  }

  async setLikeList(article, openid) {
    console.log('setLikeList');
    if (think.isEmpty(article)) {
      return article;
    }
    article.hasLiked = false;
    var hasLiked = await this.model('comment').where({artid: article.id, openid: openid, up: 1}).select();
    if (!think.isEmpty(hasLiked)) {
      article.hasLiked = true;
    }
    var likeCount = await this.model('comment').where({artid: article.id, up: 1}).count();
    article.likeCount = likeCount;
    var likes = await this.model('comment').where({artid: article.id, up: 1}).limit(3).select();
    if (!think.isEmpty(likes)) {
      for (var i = 0; i < likes.length; i++) {
        let userInfo = await this.model('user').where({openid: likes[i].openid}).find();
        if (!think.isEmpty(userInfo)) {
          likes[i].user_photo = userInfo.photo_url;
        }
      }
    }
    article.likes = likes;
    return article;
  }

}