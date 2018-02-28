'use strict';

export default {
  on: true, //是否开启 WebSocket
  type: "socket.io",
  allow_origin: "",
  sub_protocal: "",
  adapter: undefined,
  path: "api", //url path for websocket
  messages: {
    open: 'quizuser/open',
    close: 'quizuser/close',
    join: 'quizuser/join',
    answer: 'quizuser/answer',
  }
};