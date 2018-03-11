'use strict';

import Base from './base.js';

const key = 'vjfPdgJi9IBAwzieVdZUxUrAgXsjI4yGJb3vJgw1hd5';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let l = await this.model('wxmsg').limit(30).select();

    return this.success({
      list: l
    });

  }

  async addAction() {
    let MsgId = this.post('MsgId');
    let ToUserName = this.post('ToUserName');
    let FromUserName = this.post('FromUserName');
    let MsgType = this.post('MsgType');
    let CreateTime = this.post('CreateTime');
    let Content = this.post('Content');
    let PicUrl = this.post('PicUrl');
    let MediaId = this.post('MediaId');
    let SessionFrom = this.post('SessionFrom');
    let Event = this.post('Event');
    let Title = this.post('Title');
    let AppId = this.post('AppId');
    let PagePath = this.post('PagePath');
    let ThumbUrl = this.post('ThumbUrl');
    let ThumbMediaId = this.post('ThumbMediaId');
    let rawData = this.post();

    let addResult = await this.model('wxmsg').add({
      MsgId: MsgId,
      ToUserName: ToUserName,
      FromUserName: FromUserName,
      MsgType: MsgType,
      Content: Content,
      PicUrl: PicUrl,
      MediaId: MediaId,
      Event: Event,
      SessionFrom: SessionFrom,
      Title: Title,
      AppId: AppId,
      PagePath: PagePath,
      ThumbUrl: ThumbUrl,
      ThumbMediaId: ThumbMediaId,
      rawData: rawData,
      CreateTime: CreateTime,
      add_time: (Math.round((new Date()).getTime() / 1000))
    });

    return this.success({
      result: 'OK',
      errorCode: 0
    });
  }

}