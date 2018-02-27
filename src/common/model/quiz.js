'use strict';

/**
 * model
 */

var wxconst = require('../../api/controller/wxconst');


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
      if (cur.getDate() - date.getDate() == -1) {
        return '明天' + ' ' + hour + ':' + min;
      }
      else if (cur.getDate() - date.getDate() == 1) {
        return '昨天' + ' ' + hour + ':' + min;
      }
      else if (cur.getDate() > date.getDate() && cur.getDate() - date.getDate() < 7) {
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
      var arr = quiz.questions.split(wxconst.QUIZ_QUESTION_SUBFIX);
      questArr = await this.model('question').where({id: ["IN", arr]}).select();
      for (var i = 0; i < questArr.length; i++) {
        questArr[i].answered = -1;
      }
      /*for (var j = 0; j < arr.length; j++) {
        var quest_id = arr[j];
        console.log(quest_id);
        let questItem = await this.model('question').where({id: quest_id}).find();
        questItem.answered = -1;
        questArr.push(questItem);
      }*/
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
    quiz.is_start = 0;
    quiz.is_completed = 0;
    quiz.phase = wxconst.QUIZ_PHASE_BEGIN;
    if (curTime <= quiz.start_time) {
      quiz.is_start = 0;
      quiz.phase = wxconst.QUIZ_PHASE_WAIT;
    }
    else if (curTime > quiz.start_time && curTime <= quiz.start_time + quiz.quest_count * 15 - 4) {
      quiz.is_start = 1;
      quiz.phase = wxconst.QUIZ_PHASE_GAMING;
      let groupInfo = await this.model('quizuser').where({quizid: quiz.id}).count();
      if (!think.isEmpty(groupInfo)) {
        if (groupInfo < quiz.min_users) {
          quiz.phase = wxconst.QUIZ_PHASE_FINISH;
        }
      }
    }
    else if (curTime > quiz.start_time + quiz.quest_count * 15 - 4) {
      quiz.is_completed = 1;
      quiz.phase = wxconst.QUIZ_PHASE_FINISH;
    }
    else {
      quiz.is_start = 1;
      quiz.is_completed = 2;
      quiz.phase = wxconst.QUIZ_PHASE_FINISH;
    }

    quiz.format_start = this.getHourMin(quiz.start_time);
    quiz.join_status = 2;

    if (quiz.creator_id == openid) {
      quiz.join_status = 0;
    }
    else if (quiz.start_time > curTime) {
      quiz.join_status = 1;
    }

    if (quiz.start_time > curTime) {
      quiz.result_text = quiz.format_start + '开始';
    }
    else {
      quiz.result_text = '未参与';
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
        if (quiz.userdata.game_status == wxconst.GAME_STATUS_WIN) {
          quiz.result_text = '赢' + Math.floor(quiz.userdata.game_gain * 100) / 100 + '元';
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
      if (quiz.userdata.game_status == wxconst.GAME_STATUS_WIN) {
        quiz.result_text = '赢' + Math.floor(quiz.userdata.game_gain * 100) / 100 + '元';
      }
      else {
        quiz.result_text = '未胜出';
      }
    }
    if (quiz.start_time > curTime) {
      quiz.result_text = Math.round((quiz.start_time - curTime) / 60) + '分钟后';
    }
    return quiz;
  }

  async createCalculateGainEvent(quizid, interval) {
    console.log('createEvent ' + quizid + ', ' + interval);
    var table = 'weshow_quiz';
    var tableUser = 'weshow_user';
    var tableQuizUser = 'weshow_quizuser';
    var tableWxcash = 'weshow_wxcash';
    var sqlProc = ' '
        + 'CREATE PROCEDURE CalGainProc(IN qid INT) '
        + 'BEGIN '
        + 'DECLARE var_win_count INTEGER DEFAULT 0; '
        + 'DECLARE var_win_user_cur INTEGER DEFAULT -1; '
        + 'DECLARE var_price INTEGER DEFAULT 0; '
        + 'DECLARE var_game_gain INTEGER DEFAULT 0; '
        + 'DECLARE var_win FLOAT DEFAULT 0; '
        + 'DECLARE var_balance FLOAT DEFAULT 0; '
        + 'DECLARE var_openid VARCHAR(64); '
        + 'DECLARE var_creator_id VARCHAR(64); '
        + 'DECLARE done INT DEFAULT FALSE; '
        + 'START TRANSACTION; '
        + 'SELECT create_id,price,win_users INTO var_creator_id,var_price,var_win_user_cur FROM ' + table + ' WHERE id=qid; '
        + 'IF var_win_user_cur > -1 THEN '
        + '  ROLLBACK; '
        + 'ELSE '
        + '  SELECT COUNT(*) INTO var_win_count FROM ' + tableQuizUser + ' WHERE quizid=qid AND game_status=' + wxconst.GAME_STATUS_WIN + ' ; '
        + '  IF var_win_count > 0 THEN '
        + '    SET var_game_gain = var_price / var_win_count; '
        + '    UPDATE ' + tableQuizUser + ' SET game_gain=var_game_gain WHERE quizid=qid AND game_status=' + wxconst.GAME_STATUS_WIN + ' ; '
        + '    UPDATE ' + table + ' SET win_users=var_win_count WHERE id=qid; '
        + '    BEGIN '
        + '    DECLARE cur CURSOR FOR (SELECT openid FROM ' + tableQuizUser + ' WHERE quizid=qid AND game_status=' + wxconst.GAME_STATUS_WIN + '); '
        + '    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; '
        + '    OPEN cur;'
        + '      cal_loop : LOOP'
        + '        FETCH cur INTO var_openid;'
        + '        IF done THEN '
        + '          LEAVE cal_loop; '
        + '        END IF; '
        + '        SELECT win,balance INTO var_win,var_balance FROM ' + tableUser + ' WHERE openid=var_openid; '
        + '        SET var_balance = var_balance + game_gain; '
        + '        SET var_win = var_win + game_gain; '
        + '        UPDATE ' + tableUser + ' SET balance=var_balance,win=var_win WHERE openid=var_openid; '
        + '        INSERT INTO ' + tableWxcash + '(openid,quizid,cash_val,draw_type,note,draw_status,add_time) VALUES(var_openid,qid,var_game_gain,' + wxconst.WXCASH_OP_TYPE_WIN + ',' + wxconst.WXCASH_OP_NOTE_WIN + ',' + wxconst.WXCASH_STATUS_SUCCESS + ',current_timestamp/1000); '
        + '      END LOOP;'
        + '    CLOSE cur;'
        + '    END; '
        + '    SELECT balance INTO var_balance FROM ' + tableUser + ' WHERE openid=var_creator_id; '
        + '    SET var_balance = var_balance - var_price; '
        + '    UPDATE ' + tableUser + ' SET balance=var_balance WHERE openid=var_creator_id; '
        + '    INSERT INTO ' + tableWxcash + '(openid,quizid,cash_val,draw_type,note,draw_status,add_time) VALUES(var_creator_id,qid,var_price,' + wxconst.WXCASH_OP_TYPE_GAME + ',' + wxconst.WXCASH_OP_NOTE_GAME + ',' + wxconst.WXCASH_STATUS_SUCCESS + ',current_timestamp/1000); '
        + '  ELSE '
        + '    UPDATE ' + table + ' SET win_users=0 WHERE id=qid; '
        + '  END IF; '
        + '  COMMIT;'
        + 'END IF; '
        + 'END '
        + ' ; '
    //await this.model('quiz').execute(sqlProc);

    var sql = 'CREATE EVENT quiz_' + quizid + '_cal_gain_event '
        + ' on schedule at current_timestamp + interval ' + interval + ' second  do '
        + ' CALL CalGainProc(' + quizid + ');';
    return await this.model('quiz').execute(sql);
  }
}