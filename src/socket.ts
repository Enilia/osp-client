import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from './store/store';
import { SOCKETIO_STORE_PREFIX } from './store/socket.events';

Vue.use(new VueSocketIO({
  debug: true,
  connection: ':8080',
  vuex: {
    store,
    actionPrefix: SOCKETIO_STORE_PREFIX,
    mutationPrefix: SOCKETIO_STORE_PREFIX,
  },
}));
