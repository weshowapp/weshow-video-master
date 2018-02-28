'use strict';

export default {
  on: true, //是否开启 WebSocket
  type: "socket.io",
  allow_origin: "",
  sub_protocal: "",
  adapter: undefined,
  path: "", //url path for websocket
  messages: {
    open: 'api/quizuser/open',
    close: 'api/quizuser/close',
    join: 'api/quizuser/join',
    answer: 'api/quizuser/answer',
  }
};