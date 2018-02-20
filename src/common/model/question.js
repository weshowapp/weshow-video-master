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

  async getMfgContent(data) {
    if (data == null) {
      return '';
    }
    var end = data.indexOf('<table name="optionsTable" cellpadding="0" cellspacing="0" width="100%"><tbody><tr>');
    return data.substring(0, end);
  }

  async getMfgItems(data) {
    if (data == null) {
      return {};
    }
    var quest = {};
    var arr = data.split('<td width="25%">');
    var end = arr[1].indexOf('</td>');
    quest.item0 = arr[1].substring(0, end);
    end = arr[2].indexOf('</td>');
    quest.item1 = arr[2].substring(0, end);
    end = arr[3].indexOf('</td>');
    quest.item2 = arr[3].substring(0, end);
    end = arr[4].indexOf('</td>');
    quest.item3 = arr[4].substring(0, end);
    return quest;
  }

  async getMfgAnswer(data) {
    if (data == null) {
      return '';
    }
    return data.substring(0, 1);
  }

  async getMfgNote(data) {
    if (data == null) {
      return '';
    }
    var end = data.indexOf('</div></td></tr></tbody></table>');
    return data.substring(13, end);
  }
}