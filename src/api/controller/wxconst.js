
module.exports = {

    USER_ID_ADMIN: '1',

    USER_LEVEL_DEFAULT: 0,
    USER_LEVEL_NORMAL: 1,
    USER_LEVEL_PUBLIC: 3,

    GAME_STATUS_UNCOMPLETE: 0,
    GAME_STATUS_WIN: 1,
    GAME_STATUS_FAIL: 2,

    RELIVE_ADD: 1,
    RELIVE_DECREASE: 0,

    QUIZ_QUESTION_SUBFIX: '-',

    QUIZ_LEVEL_AUTO: 0,
    QUIZ_LEVEL_SIMPLE: 1,
    QUIZ_LEVEL_MID: 2,
    QUIZ_LEVEL_DIFFICULT: 3,
    QUIZ_LEVEL_DIFFICULT_1: 4,
    QUIZ_LEVEL_DIFFICULT_2: 5,

    QUIZ_CATEGORY_PUBLIC_MIX: 1,
    QUIZ_CATEGORY_LITERATE: 2,
    QUIZ_CATEGORY_SELF: 17,

    QUIZ_MIN_USERS: 2,
    QUIZ_MAX_PRICE: 1000.0,

    QUIZ_PHASE_BEGIN: 0,
    QUIZ_PHASE_WAIT: 1,
    QUIZ_PHASE_GAMING: 2,
    QUIZ_PHASE_FINISH: 3,

    QUIZ_TYPE_DEFAULT: 0,
    QUIZ_TYPE_NORMAL: 1,
    QUIZ_TYPE_PUBLIC: 3,
    QUIZ_TYPE_SELF: 17,

    WXCASH_OP_TYPE_PAY: 1,
    WXCASH_OP_TYPE_DRAW: 2,
    WXCASH_OP_TYPE_WIN: 3,
    WXCASH_OP_TYPE_GAME: 4,

    WXCASH_OP_NOTE_PAY: 'pay',
    WXCASH_OP_NOTE_DRAW: 'draw',
    WXCASH_OP_NOTE_WIN: 'win',
    WXCASH_OP_NOTE_GAME: 'game',

    WXCASH_STATUS_BEGIN: 0,
    WXCASH_STATUS_SUCCESS: 1,

    QUIZ_GAME_RULES: ['欢迎来答题',
      '每道题有10秒作答时间',
      '超时或回答错误将被淘汰',
      '答题胜出者瓜分奖金',
      '你也可以当出题官考大家哦',
      '点“发起红包答题”试试吧'
    ],
    QUESTION_CATEGORY_ITEMS: [
      { name: '0', value: '智能搭配', checked: 'true' },
      { name: '1', value: '佛系' },
      { name: '2', value: '吃货' },
      { name: '3', value: '戏精' },
      { name: '4', value: '吸猫撸狗' },
      { name: '5', value: '二次元' },
      { name: '6', value: '黑科技' },
      { name: '7', value: '文艺范' },
      { name: '8', value: '撸袖干' },
      { name: '9', value: '出去浪' },
      { name: '10', value: '自由体' },
      { name: '11', value: '小清新' },
    ],
}
