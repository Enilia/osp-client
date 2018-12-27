import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from './store';

Vue.use(new VueSocketIO({
  debug: true,
  connection: ':8080',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));
