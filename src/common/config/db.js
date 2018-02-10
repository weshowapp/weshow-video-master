'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'weshow',
      user: 'root',
      password: 'weshow',
      prefix: 'weshow_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};