import Vue from 'vue'
import Vuex from 'vuex'
import {
  SOCKETIO_USER_UPDATED,
  SOCKETIO_USER_RENAMED,
  SOCKETIO_ERROR,
  SOCKETIO_ROOM_JOINED,
  SOCKETIO_ROOM_USER_JOINED,
  SOCKETIO_ROOM_USER_LEFT,
  SOCKETIO_ROOM_USER_RENAMED } from './socket.events'
import Router from '../router'
import { User, UserDTO } from '../classes/user.class'
import { Room, RoomDTO } from '../classes/room.class'
import { OSPError, OSPErrorDTO } from '../classes/error.class'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      socketid: '',
      id: '',
      nickname: '',
    } as User,
    error: {
      message: '',
    } as OSPError,
    room: {
      id: '',
      clients: [],
    } as Room,
  },
  mutations: {
    [SOCKETIO_USER_UPDATED]( state, { id, nickname, socketid }: User ) {
      state.user = { ...state.user, id, nickname, socketid }
    },
    [SOCKETIO_USER_RENAMED]( state, nickname ) {
      state.user = { ...state.user, nickname }
    },
    [SOCKETIO_ERROR]( state, error ) {
      state.error = error
    },
    [SOCKETIO_ROOM_JOINED]( state, { id, clients } ) {
      state.room = { ...state.room, id, clients }
      Router.push({ name: 'room', params: { id } })
    },
    [SOCKETIO_ROOM_USER_JOINED]( state, client: User ) {
      const clients = state.room.clients
      clients.push( client )
      Vue.set(state.room, 'clients', clients)
    },
    [SOCKETIO_ROOM_USER_LEFT]( state, client: User ) {
      let clients = state.room.clients
      clients = clients.filter( c => c.socketid !== client.socketid )
      Vue.set(state.room, 'clients', clients)
    },
    [SOCKETIO_ROOM_USER_RENAMED]( state, client: User ) {
      const clients = state.room.clients
      const user = clients.find( c => c.socketid === client.socketid )
      if( !user ) return
      user.nickname = client.nickname
      Vue.set(state.room, 'clients', clients)
    },
  },
  actions: {
    leaveRoom({ state }) {
      state.room = { id: '', clients: [] }
    },
  },
  getters: {
    hasRoom: state => state.room.id,
    roomOtherClients: state => state.room.clients.filter( c => c.socketid !== state.user.socketid ),
    roomClientsUserFirst: (state, getters) => [state.user].concat(getters.roomOtherClients),
  },
})
