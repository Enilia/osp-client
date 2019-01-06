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
    user: new User(),
    error: new OSPError(),
    room: new Room(),
  },
  mutations: {
    [SOCKETIO_USER_UPDATED]( state, user: UserDTO ) {
      state.user = User.fromJSON(user)
    },

    [SOCKETIO_USER_RENAMED]( state, nickname: string ) {
      state.user = state.user.rename( nickname )
    },

    [SOCKETIO_ERROR]( state, error: OSPErrorDTO ) {
      state.error = OSPError.fromJSON( error )
    },

    [SOCKETIO_ROOM_JOINED]( state, room: RoomDTO ) {
      const { id } = state.room = Room.fromJSON( room )
      Router.push({ name: 'room', params: { id } })
    },

    [SOCKETIO_ROOM_USER_JOINED]( state, client: UserDTO ) {
      state.room = state.room.add( client )
    },

    [SOCKETIO_ROOM_USER_LEFT]( state, client: UserDTO ) {
      state.room = state.room.remove( client )
    },

    [SOCKETIO_ROOM_USER_RENAMED]( state, client: UserDTO ) {
      state.room = state.room.renameUser( client )
    },

  },
  actions: {
    leaveRoom({ state }) {
      state.room = new Room()
    },
  },
  getters: {
    hasRoom: state => state.room.id,
    roomOtherClients: state => state.room.clients.filter( c => c.socketid !== state.user.socketid ),
    roomClientsUserFirst: (state, getters) => [state.user].concat(getters.roomOtherClients),
  },
})
