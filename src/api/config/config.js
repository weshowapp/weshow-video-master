'use strict';
/**
 * config
 */
export default {
  //key: value

  //可以公开访问的Controller
  publicController: [
    //格式为controller
    'news',
    'video',
    'user',
    'comment',
    'auth',
	'like',
	'feedback',
  ],

  //可以公开访问的Action
  publicAction: [
    //格式为： controller+action
    'news/list',
    'news/count',
  ]
};