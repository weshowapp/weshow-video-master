'use strict';

/**
 * model
 */
export default class extends think.model.base {

  /**
   * Calculate the gain
   * @param newsId
   * @returns {Promise.<*>}
   */
  async calculateGain(qid){
	console.log('calculateGain');
	console.log(qid);
	
	let quiz = await this.model('quiz').where({id: qid}).find();
	console.log(quiz);
	var quizEndTime = 0;
	if (!think.isEmpty(quiz)) {
		if (quiz.win_users >= 0) {
			return true;
		}
		quizEndTime = quiz.start_time + quiz.quest_count * 15;
	}
	console.log(quizEndTime);
	
    var cur = new Date();
    var curTime = cur.getTime() / 1000;
    let info = await this.model('quizuser').where({quizid: qid, game_status: 0}).select();
	if (think.isEmpty(info) || (!think.isEmpty(quiz) && curTime > quizEndTime - 5)) {
	    console.log('begin calculateGain');
	    //全部回答完成
		let winList = await this.model('quizuser').where({quizid: qid, game_status: 1}).select();
		if (!think.isEmpty(winList)) {
		    //let quiz = await this.model('quiz').where({id: qid}).find();
			if (!think.isEmpty(quiz)) {
				var winCount = winList.length;
				var price = quiz.price / winCount;
				for (var i = 0; i < winCount; i++) {
				    await this.model('quizuser').where({quizid: qid, openid: winList[i].openid}).update({
					    game_gain: price
				    });
				
				    var perUserPrice = price;
				    let userInfo = await this.model('user').where({openid: winList[i].openid}).find();
    				if (!think.isEmpty(userInfo)) {
	    				perUserPrice = perUserPrice + userInfo.win;
		    		}
			    	let result = await this.model('user').where({openid: winList[i].openid}).update({
				    	win: perUserPrice
				    });
				}

				await this.model('quiz').where({id: qid}).update({
					win_users: winCount
				});
			}
		}
	}

	return true;
  }

}