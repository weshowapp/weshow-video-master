'use strict';

/**
 * model
 */
export default class extends think.model.base {

  async noNewData(refresh) {
    if (refresh == 1) {
      let timestamp = parseInt(this.get('timestamp')) - 3;
      let hasNew = await this.model('quizuser').where({ add_time: ['>', timestamp] }).find();
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
      }
    }
    return info;
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
        return true;
      }
      quizEndTime = quiz.start_time + quiz.quest_count * 15;
    }
    else {
      return false;
    }
    console.log(quizEndTime);
    console.log('calculateGain');
    console.log(qid);

    var curTime = (new Date()).getTime() / 1000;
    let info = await this.model('quizuser').where({ quizid: qid, game_status: 0 }).select();
    if (think.isEmpty(info) || (curTime > quizEndTime - 2 && curTime < quizEndTime + 10)) {
      console.log('begin calculateGain');
      //All Completed
      let winList = await this.model('quizuser').where({ quizid: qid, game_status: 1 }).select();
      console.log('winList');
      //console.log(winList);
      if (!think.isEmpty(winList) && !think.isEmpty(quiz)) {
        var winCount = winList.length;
        var price = quiz.price / winCount;
        console.log('price');
        console.log(price);
        console.log('winCount');
        console.log(winCount);
        for (var i = 0; i < winCount; i++) {
          if (winList[i].game_gain > 0.0) {
            return true;
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
          await this.model('wxcash').addOp(winList[i].openid, userInfo.name, price, 3, 'win', quizEndTime);
        }
      }
      await this.model('wxcash').addOp(quiz.creator_id, quiz.creator_name, quiz.price, 4, 'game', quizEndTime);
    }

    return true;
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
      return quizUserModel.where({ quizid: qid, game_status: 0 }).select().then(function (info) {
        if (think.isEmpty(info) || (!think.isEmpty(quiz) && curTime >= quizEndTime - 2)) {
          console.log('#3');
          let winList = quizuserModel.where({ quizid: qid, game_status: 1 }).select();
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
              wxcashModel.addOp(winList[i].openid, userInfo.name, price, 3, 'win', quizEndTime);
            }
            console.log('#5');
            return quizModel.where({ id: qid }).update({
              win_users: winCount
            }).then(function (updateInfo) {
              console.log('#6');
              return wxcashModel.addOp(quiz.creator_id, quiz.creator_name, quiz.price, 4, 'game', quizEndTime);
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

