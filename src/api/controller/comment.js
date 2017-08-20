'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let comments = await this.model('comment').limit(10).select();

    return this.success({
      commentList: comments
    });

  }

}