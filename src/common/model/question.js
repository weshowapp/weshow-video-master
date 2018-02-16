'use strict';

import Base from './base.js';

var wxconst = require('../../api/controller/wxconst');


export default class extends Base {

  async checkInput(content, item0, item1, item2, item3) {
    console.log('checkInput');
    //console.log(content);

    let info = await this.model('xwords').where({words: content}).find();
    return think.isEmpty(info);

  }

  async getRandomList(count, type, level, creator_id) {
    /*var table = 'weshow_question';
    var sql = 'SELECT * FROM ' + table + ' WHERE id >= (SELECT floor(RAND() * ((SELECT MAX(id) FROM '
        + table + ') - (SELECT MIN(id) FROM ' + table + ')) + (SELECT MIN(id) FROM '
        + table + '))) ORDER BY id LIMIT ' + count + ';';
    var list = await this.model('question').query(sql);
    console.log(list.length);*/

    var whereArg = {type: type, creator_id: creator_id};
    if (type != wxconst.QUIZ_CATEGORY_SELF) {
      if (level == wxconst.QUIZ_LEVEL_AUTO) {
      }
      else {
        whereArg = {type: type, level: level};
      }
    }
    else {
      if (creator_id != wxconst.USER_ID_ADMIN) {
        whereArg = {type: type, creator_id: ["IN", [creator_id, wxconst.USER_ID_ADMIN]]};
      }
    }
    let list = await this.model('question').field('id').where(whereArg).select();
    if (!think.isEmpty(list)) {
      console.log(list.length);
      var arr = [];
      var seed = (new Date()).getMilliseconds();
      console.log(seed);
      var first = Math.floor((list.length * seed / 1000));
      var loopIndex = 0;
      for (var i = first; i < list.length; i++) {
        //console.log(i + ', ' + list[i].id);
        if (arr.length < count) {
          var contain = false;
          for (var j = 0; j < arr.length; j++) {
            //console.log(arr[j]);
            if (arr[j] == list[i].id) {
              contain = true;
              break;
            }
          }
          if (!contain) {
            arr.push(list[i].id);
          }
        }
        else {
          break;
        }

        i += (seed % 6);
        i = i % list.length;
        console.log('i: ' + i);
        if (i == list.length - 1) {
          i = 0;
        }
        if (loopIndex++ > 1000) {
          break;
        }
      }

      console.log(arr);
      let questList = await this.model('question').where({id: ["IN", arr]}).select();
      return questList;
    }

    return list;
  }
}