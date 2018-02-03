'use strict';

/**
 * model
 */
 
const GAME_STATUS_UNCOMPLETE = 0;
const GAME_STATUS_WIN = 1;
const GAME_STATUS_FAIL = 2;
const RELIVE_ADD = 1;
const RELIVE_DECREASE = 0;

export default class extends think.model.base {

  getCurrentSecond() {
    return Math.floor((new Date()).getTime() / 1000);
  }

  getHourMin(time) {
    var cur = new Date();
    var curTime = cur.getTime() / 1000;
    var date = new Date(time * 1000);
    var hour = date.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = date.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    if (cur.getDate() != date.getDate()) {
      if (cur.getDate() - date.getDate() < 7) {
        return (cur.getDate() - date.getDate()) + '天前' + ' ' + hour + ':' + min;
      }
      return (date.getMonth() + 1) + '/' + date.getDate() + ' ' + hour + ':' + min;
    }
    return hour + ':' + min;
  }

  /**
   * 获取Quiz的Detail
   * @param quiz
   * @returns {Promise.<*>}
   */
  async setQuizQuestion(quiz, openid) {
    if (!think.isEmpty(quiz)) {
      console.log(quiz.id);
      var questArr = [];
      var arr = quiz.questions.split('-');
      for (var j = 0; j < arr.length; j++) {
        var quest_id = arr[j];
        console.log(quest_id);
        let questItem = await this.model('question').where({id: quest_id}).find();
        questItem.answered = -1;
        questArr.push(questItem);
      }
      quiz.quest_array = questArr;
    }
    return quiz;
  }

  async setQuizState(quiz, openid) {
    //console.log('setQuizResult');
    //console.log(quiz.id);
    if (think.isEmpty(quiz)) {
      return quiz;
    }

    var curTime = this.getCurrentSecond();
    quiz.current_time = curTime;
    quiz.is_completed = 0;
    if (curTime < quiz.start_time + quiz.quest_count * 15) {
      quiz.is_completed = 1;
    }
    quiz.is_start = 0;
    if (curTime > quiz.start_time) {
      quiz.is_start = 1;
    }

    quiz.format_start = this.getHourMin(quiz.start_time);
    quiz.join_status = 2;

    if (quiz.creator_id == openid) {
      quiz.join_status = 0;
    }
    else if (quiz.start_time > curTime) {
      quiz.join_status = 1;
    }

    let quInfo = await this.model('quizuser').where({quizid: quiz.id, openid: openid}).find();
    if (!think.isEmpty(quInfo)) {
      let userInfo = await this.model('user').where({openid: openid}).find();
      if (!think.isEmpty(userInfo)) {
        quInfo.user_photo = userInfo.photo_url;
      }
    }
    else {
      return quiz;
    }
    quiz.userdata = quInfo;

    if (quiz.join_status == 0) {
      if (quiz.start_time > curTime) {
        quiz.result_text = quiz.format_start + '开始';
      }
      else {
        if (quiz.userdata.game_status == GAME_STATUS_WIN) {
          quiz.result_text = '胜出，分得' + quiz.userdata.game_gain + '元';
        }
        else {
          quiz.result_text = '未胜出';
        }
      }
    }
    else if (quiz.join_status == 1) {
      quiz.result_text = quiz.format_start + '开始';
    }
    else if (quiz.join_status == 2) {
      if (quiz.userdata.game_status == GAME_STATUS_WIN) {
        quiz.result_text = '胜出，分得' + quiz.userdata.game_gain + '元';
      }
      else {
        quiz.result_text = '未胜出';
      }
    }
    return quiz;
  }

}