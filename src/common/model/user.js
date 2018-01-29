'use strict';

/**
 * model
 */
export default class extends think.model.base {

  /**
   * Gen random string
   */
  randomString(len) {
    var s= '';
    var randomchar = function() {
      var n = Math.floor(Math.random() * 56);
      if (n < 10) return n; //1-10
      //if (n < 36) return String.fromCharCode(n + 55); //A-Z
      return String.fromCharCode(n + 55); //a-z
    }
    while(s.length < len) {
      s += randomchar();
	}
    return s;
  }

}