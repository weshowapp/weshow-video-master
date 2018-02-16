'use strict';

import Base from './base.js';

export default class extends Base {


  async checkInput(content, item0, item1, item2, item3) {
    console.log('checkInput');
    //console.log(content);

    let info = await this.model('xwords').where({words: content}).find();
    return think.isEmpty(info);

  }

  async getRandomList(count, type, creator_id) {
    /*var table = 'weshow_question';
    var sql = 'SELECT * FROM ' + table + ' WHERE id >= (SELECT floor(RAND() * ((SELECT MAX(id) FROM '
        + table + ') - (SELECT MIN(id) FROM ' + table + ')) + (SELECT MIN(id) FROM '
        + table + '))) ORDER BY id LIMIT ' + count + ';';
    var list = await this.model('question').query(sql);
    console.log(list.length);*/

    let list = await this.model('question').field('id').where({type: type}).select();
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