'use strict';

import Base from './base.js';

const rp = require("request-promise");
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
    if (arr.length < 5) {
      arr = data.split('<td width="50%">');
      if (arr.length < 5) {
        arr = data.split('<td width="100%">');
      }
    }
    if (arr.length < 5) {
      return quest;
    }
    var end = arr[1].indexOf('</td>');
    quest.item0 = arr[1].substring(2, end);
    end = arr[2].indexOf('</td>');
    quest.item1 = arr[2].substring(2, end);
    end = arr[3].indexOf('</td>');
    quest.item2 = arr[3].substring(2, end);
    end = arr[4].indexOf('</td>');
    quest.item3 = arr[4].substring(2, end);
    return quest;
  }

  async getMfgAnswer(data) {
    if (data == null) {
      return '';
    }
    var answer = data.substring(0, 1);
    return answer == 'A' ? 0 : (answer == 'B' ? 1 : (answer == 'C' ? 2 : (answer == 'D' ? 3 : 4)));
  }

  async getMfgNote(data) {
    if (data == null) {
      return '';
    }
    var end = data.indexOf('</div></td></tr></tbody></table>');
    var note = data.substring(13, end);
    if (note.length > 255) {
      note = note.substring(0, 240);
    }
  }

  async addFromMfg(line) {
    var arr = line.split(',');
    var quest =  {};
    if (arr[3] != null) {
      console.log(arr[3]);
      let options = {
        method: 'GET',
        url: arr[3],
        //host: 'http://www.mofangge.com/',
        //path: '/html/qDetail/06/c1/201408/gmqdc106196190.html',
        header: {
          'Content-Type': 'text/html; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 appservice webview/100000',
        },
        head: {
          'Content-Type': 'text/html; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 appservice webview/100000',
        }
      };

      var rawData = await rp(options);
      console.log(rawData.length);
      var DIVIDER = '<table style="WORD-BREAK: break-all" border="0" width="650"><tbody><tr><td><div>';
      var questDataArr = rawData.split(DIVIDER);
      console.log(questDataArr.length);
      var content = getMfgContent(questDataArr[1]);
      var items = getMfgItems(questDataArr[1]);
      var answer = getMfgAnswer(questDataArr[2]);
      var note = getMfgNote(questDataArr[3]);

      quest.content = content;
      quest.item0 = items.item0;
      quest.item1 = items.item1;
      quest.item2 = items.item2;
      quest.item3 = items.item3;
      quest.answer = answer;
      quest.note = note;
      console.log(quest);

      var item_count = 3;
      if (item3 != '') {
        item_count = 4;
      }

      let addResult = await this.model('question').add({
        title: 'A',
        creator_id: '1',
        creator_name: 'Administrator',
        item_count: item_count,
        type: arr[1] == 'A' ? wxconst.QUIZ_CATEGORY_PUBLIC_MIX : wxconst.QUIZ_CATEGORY_SELF,
        level: arr[2],
        source: 'mofangge',
        content: quest.content,
        item0: quest.item0,
        item1: quest.item1,
        item2: quest.item2,
        item3: quest.item3,
        answer: quest.answer,
        note: quest.note,
        tags: arr[4],
        category0: arr[5],
        category1: arr[6],
        category2: arr[7],
        category3: arr[8],
        more: arr[9]
      });
      return addResult;
    }
    return 0;
  }
}