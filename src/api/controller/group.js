'use strict';

import Base from './base.js';
const fs = require('fs');
const _ = require('lodash');

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexbyidAction(){
    let id = this.get('gid');
    let info = await this.model('group').where({id: id}).find();
    return this.json(info);
  }

  async getbyopengidAction(){
	let gid = this.get('open_gid');
    let info = await this.model('group').where({open_gid: gid}).find();
    return this.json(info);
  }
  
  async getbyticketAction(){
	let ticket = this.get('share_ticket');
    let info = await this.model('group').where({share_ticket: ticket}).find();
    return this.json(info);
  }

  async addAction(){
    let add_id = this.post('add_id');
    let add_name = this.post('add_name');
	let gid = this.post('gid');
	let ticket = this.post('share_ticket');
	let name = this.post('name');
    let add_time = this.post('add_time');
	console.log('Group.add');
	console.log(add_id);
	console.log(add_name);
	console.log(gid);
	
    let addResult = await this.model('group').add({
		add_id: add_id,
		add_name: add_name,
        add_time: add_time,
        open_gid: gid,
		share_ticket: ticket,
		name: name
    });
	
	return this.success({
      result: 'OK',
	  gid: addResult,
      errorCode: 0
    });
  }

}