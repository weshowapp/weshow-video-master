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

  async getRandomList(count, type, level, creator_id, onlyself) {
    /*var table = 'weshow_question';
    var sql = 'SELECT * FROM ' + table + ' WHERE id >= (SELECT floor(RAND() * ((SELECT MAX(id) FROM '
        + table + ') - (SELECT MIN(id) FROM ' + table + ')) + (SELECT MIN(id) FROM '
        + table + '))) ORDER BY id LIMIT ' + count + ';';
    var list = await this.model('question').query(sql);
    console.log(list.length);*/

    var whereArg = {type: type, creator_id: creator_id};
    if (type != wxconst.QUIZ_TYPE_SELF) {
      if (level == wxconst.QUIZ_LEVEL_AUTO) {
      }
      else {
        whereArg = {type: type, level: level};
      }
    }
    else {
      if (creator_id != wxconst.USER_ID_ADMIN) {
        if (onlyself == 1) {
          whereArg = {creator_id: creator_id};
          var selfList = await this.model('question').where(whereArg).limit(count).select();
          if (!think.isEmpty(selfList)) {
            return selfList;
          }
          whereArg = {type: type, creator_id: ["IN", [creator_id, wxconst.USER_ID_ADMIN]]};
        }
        else {
          whereArg = {type: type, creator_id: ["IN", [creator_id, wxconst.USER_ID_ADMIN]]};
        }
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

        //i += (seed % 6);
        i += Math.floor((list.length * Math.random()));
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
    var content = data.substring(0, end);
    content = content.replace(new RegExp('&nbsp;', "gm"), '');
    return content;
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

  parseAnswer(answer) {
    return answer == 'A' ? 0 : (answer == 'B' ? 1 : (answer == 'C' ? 2 : (answer == 'D' ? 3 : 4)));
  }

  async getMfgAnswer(data) {
    if (data == null) {
      return '';
    }
    var answer = data.substring(0, 1);
    //return answer == 'A' ? 0 : (answer == 'B' ? 1 : (answer == 'C' ? 2 : (answer == 'D' ? 3 : 4)));
    return parseAnswer(answer);
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
    return note;
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

  parseMfgTitleItems(data) {
    if (data == null) {
      return {};
    }
    //console.log(data);
    var quest = {item0: '', item1: '', item2: '', item3: ''};
    var start = data.indexOf('A');
    var next = data.substring(start);
    var end = next.indexOf('B');
    quest.item0 = next.substring(1, end);
    quest.item0 = this.trimItem(quest.item0);
    next = next.substring(end);
    end = next.indexOf('C');
    if (end == -1) {
      end = next.indexOf('-');
      quest.item1 = next.substring(1, end);
      quest.item1 = this.trimItem(quest.item1);
      quest.item2 = '';
      quest.item3 = '';
      return quest;
    }
    quest.item1 = next.substring(1, end);
    quest.item1 = this.trimItem(quest.item1);
    next = next.substring(end);
    end = next.indexOf('D');
    if (end == -1) {
      end = next.indexOf('-');
      quest.item2 = next.substring(1, end);
      quest.item2 = this.trimItem(quest.item2);
      quest.item3 = '';
      console.log(quest);
      return quest;
    }
    quest.item2 = next.substring(1, end);
    quest.item2 = this.trimItem(quest.item2);
    next = next.substring(end);
    end = next.indexOf('-');
    quest.item3 = next.substring(1, end);
    quest.item3 = this.trimItem(quest.item3);
    console.log(quest);
    return quest;
  }

  trimItem(item) {
    item = item.trim();
    if (item.substr(0, 1) == '.') {
      item = item.substring(1);
      item = item.trim();
    }
    if (item.substr(0, 1) == '．') {
      item = item.substring(1);
      item = item.trim();
    }
    return item;
  }

  parsePpItems(data) {
    if (data == null) {
      return {};
    }
    console.log(data);
    var quest = {item0: '', item1: '', item2: '', item3: ''};
    var start = data.indexOf('A');
    var next = data.substring(start);
    var end = next.indexOf('B');
    quest.item0 = next.substring(1, end);
    quest.item0 = this.trimItem(quest.item0);
    next = next.substring(end);
    end = next.indexOf('C');
    if (end == -1) {
      quest.item1 = next.substring(1);
      quest.item1 = this.trimItem(quest.item1);
      quest.item2 = '';
      quest.item3 = '';
      return quest;
    }
    quest.item1 = next.substring(1, end);
    quest.item1 = this.trimItem(quest.item1);
    next = next.substring(end);
    end = next.indexOf('D');
    if (end == -1) {
      quest.item2 = next.substring(1);
      quest.item2 = this.trimItem(quest.item2);
      quest.item3 = '';
      return quest;
    }
    quest.item2 = next.substring(1, end);
    quest.item2 = this.trimItem(quest.item2);
    next = next.substring(end);
    quest.item3 = next.substring(1);
    quest.item3 = this.trimItem(quest.item3);
    console.log(quest);
    return quest;
  }

  async addPpText(line0, line1) {
    //console.log(line0);
    var content = line0.trim();
    console.log(content.length);
    var start = content.length - 1;
    var answer = content.substr(start, 1);
    content = content.substring(0, start);
    answer = this.parseAnswer(answer);
    //console.log(answer);

    var arr = content.split('.');
    if (arr.length > 1 && parseInt(arr[0]) > 0) {
      content = arr[1];
    }
    else {
      var arr1 = content.split('、');
      if (arr1.length > 1 && parseInt(arr1[0]) > 0) {
        content = arr1[1];
      }
    }
    content = content.trim();

    if (content != null && content != '') {
      //console.log(content);
      var items = this.parsePpItems(line1.trim());

      var item_count = 2;
      if (items.item2 != '') {
        item_count = 3;
      }
      if (items.item3 != '') {
        item_count = 4;
      }

      let addResult = await this.model('question').add({
        title: 'A',
        creator_id: '1',
        creator_name: 'Administrator',
        item_count: item_count,
        type: wxconst.QUIZ_CATEGORY_PUBLIC_MIX,
        level: 6,
        source: 'paipai',
        content: content,
        item0: items.item0,
        item1: items.item1,
        item2: items.item2,
        item3: items.item3,
        answer: answer,
        note: '',
        tags: '1'
      });
      return addResult;
    }
    return 0;
  }

  async addWord(line) {
    console.log(line);
    var arr = line.trim().split('，');
    var wrong = line;
    var correct = line;
    if (arr.length > 1) {
      wrong = arr[0];
      correct = arr[1];
    }
    else {
      var arr1 = line.trim().split(',');
      if (arr1.length > 1) {
        wrong = arr1[0];
        correct = arr1[1];
      }
    }
    wrong = wrong.trim();
    correct = correct.trim();
    console.log(wrong + ", " + correct);
    if (wrong != null && wrong != '' && correct != null && correct != '') {
      var content = '“' + wrong + '”中的第一个错别字是哪个？';
      var note = '正确的写法是：“' + correct + '”';
      var item_count = 2;
      var item0 = wrong.substr(0, 1);
      var item1 = wrong.substr(1, 1);
      var item2 = '';
      if (wrong.length > 2) {
        item2 = wrong.substr(2, 1);
        item_count = 3;
      }
      var item3 = '';
      if (wrong.length > 3) {
        item3 = wrong.substr(3, 1);
        item_count = 4;
        if (item3 == item2 && correct.substr(2, 1) == correct.substr(3, 1)) {
          item3 = '';
          item_count = 3;
        }
      }
      var answer = 4;
      for (var i = 0; i < wrong.length; i++) {
        if (i > 3) {
          break;
        }
        if (wrong.substr(i, 1) != correct.substr(i, 1)) {
          answer = i;
          break;
        }
      }
      let addResult = await this.model('question').add({
        title: 'A',
        creator_id: '1',
        creator_name: 'Administrator',
        item_count: item_count,
        type: wxconst.QUIZ_CATEGORY_PUBLIC_MIX,
        level: 3,
        source: 'word',
        content: content,
        item0: item0,
        item1: item1,
        item2: item2,
        item3: item3,
        answer: answer,
        note: note,
        category0: '文化',
        tags: '文艺范'
      });
      return addResult;
    }
    return 0;
  }
}