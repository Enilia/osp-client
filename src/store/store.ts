import Vue from 'vue';
import Vuex from 'vuex';
import { SOCKETIO_USER_UPDATED, SOCKETIO_USER_RENAMED } from './socket.events';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      nickname: '',
    }
  },
  mutations: {
    [SOCKETIO_USER_UPDATED] ( state, { id, nickname } ) {
      state.user = { ...state.user, id, nickname }
    },
    [SOCKETIO_USER_RENAMED] ( state, nickname ) {
      state.user = { ...state.user, nickname }
    },
  },
  actions: {

  },
});
