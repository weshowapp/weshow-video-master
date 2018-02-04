'use strict';
/**
 * config
 */
export default {
  //key: value

  //可以公开访问的Controller
  publicController: [
    //格式为controller
    'user',
    'auth',
    'quiz',
    'question',
    'group',
    'usergroup',
    'relive',
    //'quizuser',
    //'wxcash',
    'wxpay',
    'note',
  ],

  //可以公开访问的Action
  publicAction: [
    //格式为： controller+action
    'quizuser/getbyuid',
    'wxcash/index',
  ]
};