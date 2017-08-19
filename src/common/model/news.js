'use strict';
/**
 * model
 */
export default class extends think.model.base {

  /**
   * 获取News的Video List
   * @param newsId
   * @returns {Promise.<*>}
   */
  async getVideoList(newsId){
    return await this.model('video').where({news_id: newsId}).select();
  }
  
}