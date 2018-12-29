import Vue from 'vue';
import Vuex from 'vuex';
import { SOCKETIO_USER_UPDATED, SOCKETIO_USER_RENAMED, SOCKETIO_ERROR, SOCKETIO_ROOM_JOINED } from './socket.events';
import Router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      nickname: '',
    },
    error: {
      message: ''
    },
    room: {
      id: '',
      clients: [],
    }
  },
  mutations: {
    [SOCKETIO_USER_UPDATED] ( state, { id, nickname } ) {
      state.user = { ...state.user, id, nickname }
    },
    [SOCKETIO_USER_RENAMED] ( state, nickname ) {
      state.user = { ...state.user, nickname }
    },
    [SOCKETIO_ERROR] ( state, error ) {
      state.error = error
    },
    [SOCKETIO_ROOM_JOINED] ( state, { id, clients } ) {
      state.room = { ...state.room, id, clients }
      Router.push({ name: 'room', params: { id } })
    },
  },
  actions: {

  },
  getters: {
    hasRoom: (state) => state.room.id
  }
});
