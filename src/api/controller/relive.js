'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let openid = this.get('openid');
    //console.log(openid);
    let l = await this.model('relive').where({openid: openid}).order('add_time DESC').limit(30).select();

    return this.success({
      list: l
    });

  }

}