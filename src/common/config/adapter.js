'use strict';

const path = require('path');
const {File} = require('think-logger3');

exports.logger = {
  type: 'file',
  file: {
    handle: File,
    backups: 10,
    absolute: true,
    maxLogSize: 50 * 1024,  //50M
    filename: path.join(think.ROOT_PATH, 'logs/xx.log')
  }
}