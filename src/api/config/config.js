'use strict';
/**
 * config
 */
export default {
  //key: value

  //可以公开访问的Controller
  publicController: [
    //格式为controller
    //'user',
    'article',
    'comment',
    'upload',
    'auth',
    'magazine',
    //'quiz',
    'question',
    //'group',
    //'usergroup',
    //'relive',
    //'quizuser',
    //'wxcash',
    //'wxpay',
    //'note',
    'wxmsg',
    'wxadmin',
  ],

  //可以公开访问的Action
  publicAction: [
    //格式为： controller+action
    'user/add',
    'user/info',
    'user/index',
    'user/level',
    'user/delete',
    'user/update',
    'auth/getwxsession',
    'quiz/index',
    'quiz/getbyuser',
    'quizuser/getbyuid',
    'quizuser/getbyquizid',
    'quizuser/add',
    'wxcash/index',
    'wxpay/notify',
    'wxadmin/index',
    'comment/like',
    'quizuser/open', //wss
    'quizuser/close', //wss
    'quizuser/join', //wss
    'quizuser/answer', //wss
  ],

  //Html的Action
  htmlAction: [
    'wxadmin/upload',
    'wxadmin/queryinput',

    'wxcash/index',

    'user/index',
    'user/delete',
    'user/update',

    'upload/webadd',
    'upload/index',
    'upload/delete',
    'upload/update',
    'upload/queryinput',
    'upload/upload',
    'upload/uploadurl',

    'magazine/index',
    'comment/like',

    'question/webadd',
    'question/index',
    'question/delete',
    'question/update',
    'question/queryinput',
    'question/upload',
    'question/uploadmfg',
    'question/uploadmfgfile',
    'question/uploadwords',
  ],

};