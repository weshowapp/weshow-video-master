'use strict';

var wxconst = require('../../api/controller/wxconst');

var mSocketMap = new Map();


/**
 * model
 */
export default class extends think.model.base {

  async noNewData(qid, refresh, tm) {
    if (refresh == 1) {
      let timestamp = parseInt(tm) - 3;
      let hasNew = await this.model('quizuser').where({ quizid: qid, add_time: ['>', timestamp] }).find();
      return think.isEmpty(hasNew);
    }
    return false;
  }
  
  async setUserInfoWithUid(info, openid) {
    if (!think.isEmpty(info)) {
      let userInfo = await this.model('user').where({openid: openid}).find();
      if (!think.isEmpty(info) && !think.isEmpty(userInfo)) {
        for (var i = 0; i < info.length; i++) {
          info[i].user_photo = userInfo.photo_url;
          info[i].user_name = userInfo.name;
        }
      }
    }
    return info;
  }

  async setUserInfo(info) {
    if (!think.isEmpty(info)) {
      for (var i = 0; i < info.length; i++) {
        let userInfo = await this.model('user').where({openid: info[i].openid}).find();
        if (!think.isEmpty(userInfo)) {
          info[i].user_photo = userInfo.photo_url;
          info[i].user_name = userInfo.name;
        }
        else {
          info[i].user_photo = '../../icon/share_more.png';
          info[i].user_name = '未知';
          //var add_time = Math.round((new Date()).getTime() / 1000);
          //await this.model('quizuser').where({quizid: info[i].quizid, openid: info[i].openid}).update({
          //  add_time: add_time
          //});
        }
      }
    }
    return info;
  }

  async openWebSocket(socket) {
    console.log('openWebSocket');
    console.log(socket.openid);
    var openid = socket.openid;
    mSocketMap.set(openid, socket);
    console.log(mSocketMap);
    //console.log(Object.getOwnPropertyNames(mSocketMap).length);
  }

  async closeWebSocket(socket) {
    console.log('closeWebSocket');
    var openid = socket.openid;
    //console.log(mSocketMap.size());
    console.log(Object.getOwnPropertyNames(mSocketMap).length);
    for (var [key, value] of mSocketMap) {
      if (value.id == socket.id) {
        openid = key;
        break;
      }
	}
    console.log(openid);
    mSocketMap.delete(openid);
    //console.log(mSocketMap.size());
    console.log(Object.getOwnPropertyNames(mSocketMap).length);
  }

  async sendWebSocketMsg(quizid, uid, msg) {
    console.log('sendWebSocketMsg');
    var arr = [];
    let userList = await this.model('quizuser').where({ quizid: quizid }).select();
    console.log(mSocketMap);
    for (var i = 0; i < userList.length; i++) {
      var openid = userList[i].openid;
      console.log(openid);
      console.log(Object.getOwnPropertyNames(mSocketMap).length);
      var socket = mSocketMap.get(openid);
      arr.push(socket);
      if (socket != null && socket != undefined) {
        console.log(socket.id);
        console.log(socket.openid);
        //this.emit(msg, {
        //  msg: msg,
        //  openid: uid
        //});
      }
    }
    return arr;
  }

  /**
   * Calculate the gain
   * @param newsId
   * @returns {Promise.<*>}
   */
  async calculateGain(qid) {

    let quiz = await this.model('quiz').where({ id: qid }).find();
    //console.log(quiz);
    var quizEndTime = 0;
    if (!think.isEmpty(quiz)) {
      if (quiz.win_users >= 0) {
        return false;
      }
      quizEndTime = quiz.start_time + quiz.quest_count * 15;
    }
    else {
      return false;
    }
    console.log(quizEndTime);
    console.log('calculateGain');
    console.log(qid);
    var arr = quiz.questions.split(wxconst.QUIZ_QUESTION_SUBFIX);
    var secondLastQuestionId = arr[arr.length - 2];
    console.log(secondLastQuestionId + ', ' + quiz.questions);

    var curTime = (new Date()).getTime() / 1000;
    let uncompletedCount = await this.model('quizuser').where({ quizid: qid, game_status: wxconst.GAME_STATUS_UNCOMPLETE }).count();
    let secondLastAnswerCount = await this.model('quizuser').where({ quizid: qid, answer_status: secondLastQuestionId }).count();
    console.log(uncompletedCount + ',' + secondLastAnswerCount);
    if (uncompletedCount == 0 || secondLastAnswerCount == 0 || (curTime > quizEndTime - 3 && curTime < quizEndTime + 10)) {
      console.log('begin calculateGain');
      //All Completed
      let winList = await this.model('quizuser').where({ quizid: qid, game_status: wxconst.GAME_STATUS_WIN }).select();
      console.log('winList');
      //console.log(winList);
      if (think.isEmpty(winList)) {
        await this.model('quiz').where({ id: qid }).update({
          win_users: 0
        });
      }
      else {
        var winCount = winList.length;
        var price = Math.floor(quiz.price * 100 / winCount) / 100;
        console.log('price');
        console.log(price);
        console.log('winCount');
        console.log(winCount);
        for (var i = 0; i < winCount; i++) {
          if (winList[i].game_gain > 0.0) {
            return false;
          }
        }

        await this.model('quiz').where({ id: qid }).update({
          win_users: winCount
        });

        for (var i = 0; i < winCount; i++) {
          console.log('winItem');
          //console.log(winList[i]);
          await this.model('quizuser').where({ quizid: qid, openid: winList[i].openid }).update({
            game_gain: price
          });

          var perUserPrice = price;
          let userInfo = await this.model('user').where({ openid: winList[i].openid }).find();
          if (!think.isEmpty(userInfo)) {
            perUserPrice = perUserPrice + userInfo.win;
          }
          let result = await this.model('user').where({ openid: winList[i].openid }).update({
            win: perUserPrice
          });
          await this.model('wxcash').addOp(winList[i].openid, quiz.id, price, wxconst.WXCASH_OP_TYPE_WIN, wxconst.WXCASH_OP_NOTE_WIN, quizEndTime);
        }
        if (winCount > 0) {
          await this.model('wxcash').addOp(quiz.creator_id, quiz.id, quiz.price, wxconst.WXCASH_OP_TYPE_GAME, wxconst.WXCASH_OP_NOTE_GAME, quizEndTime);
        }
      }
      return true;
    }

    return false;
  }

async calculateGain1(qid) {
    var quizModel = this.model('quiz');
    var quizuserModel = this.model('quizuser');
    var userModel = this.model('user');
    var wxcashModel = this.model('wxcash');

    return quizModel.transaction(function () {
      //#1
      console.log('calculateTransaction');
      console.log('#1');
      let quiz = quizModel.where({ id: qid }).find();
      var quizEndTime = 0;
      if (!think.isEmpty(quiz)) {
        if (quiz.win_users >= 0) {
          return false;
        }
        quizEndTime = quiz.start_time + quiz.quest_count * 15;
      }
      else {
        return false;
      }

      //#2
      var curTime = (new Date()).getTime() / 1000;
      console.log('#2');
      return quizUserModel.where({ quizid: qid, game_status: wxconst.GAME_STATUS_UNCOMPLETE }).select().then(function (info) {
        if (think.isEmpty(info) || (!think.isEmpty(quiz) && curTime >= quizEndTime - 2)) {
          console.log('#3');
          let winList = quizuserModel.where({ quizid: qid, game_status: wxconst.GAME_STATUS_WIN }).select();
          if (think.isEmpty(winList)) {
            return false;
          }
          else {
            var winCount = winList.length;
            var price = quiz.price / winCount;
            for (var i = 0; i < winCount; i++) {
              if (winList[i].game_gain > 0.0) {
                return true;
              }
            }

            console.log('#4');
            for (var i = 0; i < winCount; i++) {
              console.log('winItem');
              quizuserModel.where({ quizid: qid, openid: winList[i].openid }).update({
                game_gain: price
              });

              var perUserPrice = price;
              let userInfo = userModel.where({ openid: winList[i].openid }).find();
              if (!think.isEmpty(userInfo)) {
                perUserPrice = perUserPrice + userInfo.win;
              }
              let result = userModel.where({ openid: winList[i].openid }).update({
                win: perUserPrice
              });
              wxcashModel.addOp(winList[i].openid, quiz.id, price, wxconst.WXCASH_OP_TYPE_WIN, wxconst.WXCASH_OP_NOTE_WIN, quizEndTime);
            }
            console.log('#5');
            return quizModel.where({ id: qid }).update({
              win_users: winCount
            }).then(function (updateInfo) {
              console.log('#6');
              return wxcashModel.addOp(quiz.creator_id, quiz.id, quiz.price, wxconst.WXCASH_OP_TYPE_GAME, wxconst.WXCASH_OP_NOTE_GAME, quizEndTime);
            });
          }
        }
        else {
          return false;
        }
  
      });
    }).then(function (result) {
      return result;
    }).catch(function (err) {
      return false;
    })
  }
}

