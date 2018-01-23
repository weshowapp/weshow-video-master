'use strict';

import Base from './base.js';
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async getbygidAction(){
    let id = this.get('gid');
    let info = await this.model('usergroup').where({id: id}).find();
    return this.json(info);
  }

  async getbyopengidAction(){
	let gid = this.get('open_gid');
    let info = await this.model('usergroup').where({open_gid: gid}).find();
    return this.json(info);
  }

  async getbyuidAction(){
	let uid = this.get('uid');
    let info = await this.model('usergroup').where({uid: uid}).find();
    return this.json(info);
  }

  async getbyopenidAction(){
	let uid = this.get('openid');
    let info = await this.model('usergroup').where({openid: uid}).find();
    return this.json(info);
  }

  async addAction(){
	let gid = this.get('gid');
	let uid = this.get('userid');
	let note = this.get('note');
    let check_time = this.post('check_time');
	console.log('UserGroup.add');
	console.log(uid);
	console.log(gid);
	console.log(check_time);
	
    let addResult = await this.model('usergroup').add({
            check_time: check_time,
            open_gid: gid,
			openid: uid,
			note: note
        });
	
	return this.success({
      result: 'OK',
	  gid: addResult,
      errorCode: 0
    });
  }

}