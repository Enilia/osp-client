import Vue from 'vue'
import Vuex from 'vuex'
import {
  SOCKETIO_USER_UPDATED,
  SOCKETIO_USER_RENAMED,
  SOCKETIO_ERROR,
  SOCKETIO_ROOM_JOINED,
  SOCKETIO_ROOM_USER_JOINED,
  SOCKETIO_ROOM_USER_LEFT,
  SOCKETIO_ROOM_USER_RENAMED,
  SOCKETIO_CONNECTED,
  SOCKETIO_DISCONNECTED } from '../config/socket.events'
import Router from '../router'
import { User, UserDTO } from '../classes/user.class'
import { Room, RoomDTO } from '../classes/room.class'
import { OSPError, OSPErrorDTO } from '../classes/error.class'
import { SET_USER, SET_ROOM, SET_ERROR } from '../config/store-mutations'
import { LEAVE_ROOM, CLEAR_ERROR } from '../config/store-actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new User(),
    error: new OSPError(),
    room: new Room(),
  },
  mutations: {

    [SET_USER]( state, user: User ) {
      state.user = user
    },

    [SET_ROOM]( state, room: Room ) {
      state.room = room
    },

    [SET_ERROR]( state, error: OSPError ) {
      state.error = error
    },

  },
  actions: {
    [LEAVE_ROOM]({ commit }) {
      commit( SET_ROOM, new Room() )
    },

    [CLEAR_ERROR]({ commit }) {
      commit( SET_ERROR, new OSPError() )
    },

    [SOCKETIO_CONNECTED]() {
      //
    },

    [SOCKETIO_DISCONNECTED]({ commit }) {
      commit( SET_ERROR, new OSPError('You have been disconnected') )
      Router.push({ name: 'home' })
    },

    [SOCKETIO_USER_UPDATED]( { commit }, user: UserDTO ) {
      commit( SET_USER, User.fromJSON(user) )
    },

    [SOCKETIO_USER_RENAMED]( { commit, state }, nickname: string ) {
      commit( SET_USER, state.user.rename( nickname ) )
    },

    [SOCKETIO_ERROR]( { commit }, error: OSPErrorDTO ) {
      commit( SET_ERROR, OSPError.fromJSON( error ) )
    },

    [SOCKETIO_ROOM_JOINED]( { commit }, room: RoomDTO ) {
      commit( SET_ROOM, Room.fromJSON( room ) )
      Router.push({ name: 'room', params: { id: room.id } })
    },

    [SOCKETIO_ROOM_USER_JOINED]( { commit, state }, client: UserDTO ) {
      commit( SET_ROOM, state.room.add( client ) )
    },

    [SOCKETIO_ROOM_USER_LEFT]( { commit, state }, client: UserDTO ) {
      commit( SET_ROOM, state.room.remove( client ) )
    },

    [SOCKETIO_ROOM_USER_RENAMED]( { commit, state }, client: UserDTO ) {
      commit( SET_ROOM, state.room.renameUser( client ) )
    },

  },
  getters: {
    hasRoom: state => state.room.id,
    roomOtherClients: state => state.room.clients.filter( c => c.socketid !== state.user.socketid ),
    roomClientsUserFirst: (state, getters) => [state.user].concat(getters.roomOtherClients),
  },
})
