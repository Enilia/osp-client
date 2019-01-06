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
import { M_SET_USER, M_SET_ROOM, M_ADD_ERROR, M_CLEAR_ERROR } from '../config/store-mutations'
import { A_LEAVE_ROOM, A_CLEAR_ERROR, A_CREATE_ROOM, A_JOIN_ROOM, A_RENAME_USER } from '../config/store-actions'
import $socket from './socket-instance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: new User(),
    error: [] as OSPError[],
    room: new Room(),
  },
  mutations: {

    [M_SET_USER]( state, user: User ) {
      state.user = user
    },

    [M_SET_ROOM]( state, room: Room ) {
      state.room = room
    },

    [M_ADD_ERROR]( state, error: OSPError ) {
      state.error = state.error.concat(error)
    },

    [M_CLEAR_ERROR]( state ) {
      state.error = state.error.slice(1)
    },

  },
  actions: {
    [A_LEAVE_ROOM]() {
      $socket.emit(A_LEAVE_ROOM)
    },

    [A_CLEAR_ERROR]({ commit }) {
      commit( M_CLEAR_ERROR )
    },

    [A_CREATE_ROOM]() {
      $socket.emit( A_CREATE_ROOM )
    },

    [A_JOIN_ROOM]( context, id: string ) {
      $socket.emit( A_JOIN_ROOM, id )
    },

    [A_RENAME_USER]( { state: { user: { nickname } } }, newNickname: string ) {
      if( nickname === newNickname ) return
      $socket.emit( A_RENAME_USER, newNickname )
    },

    // [SOCKETIO_CONNECTED]() {
    // },

    [SOCKETIO_DISCONNECTED]({ commit }) {
      commit( M_ADD_ERROR, new OSPError('You have been disconnected') )
      Router.push({ name: 'home' })
    },

    [SOCKETIO_USER_UPDATED]( { commit, dispatch, state: { user: { nickname }, room: { id } } }, user: UserDTO ) {
      commit( M_SET_USER, User.fromJSON(user) )
      dispatch( A_RENAME_USER, nickname )
      if( id ) dispatch( A_JOIN_ROOM, id )
    },

    [SOCKETIO_USER_RENAMED]( { commit, state: { user } }, nickname: string ) {
      commit( M_SET_USER, user.rename( nickname ) )
    },

    [SOCKETIO_ERROR]( { commit }, error: OSPErrorDTO ) {
      commit( M_ADD_ERROR, OSPError.fromJSON( error ) )
    },

    [SOCKETIO_ROOM_JOINED]( { commit }, room: RoomDTO ) {
      commit( M_SET_ROOM, Room.fromJSON( room ) )
      Router.push({ name: 'room', params: { id: room.id } })
    },

    [SOCKETIO_ROOM_USER_JOINED]( { commit, state: { room } }, client: UserDTO ) {
      commit( M_SET_ROOM, room.add( client ) )
    },

    [SOCKETIO_ROOM_USER_LEFT]( { commit, state: { room } }, client: UserDTO ) {
      commit( M_SET_ROOM, room.remove( client ) )
    },

    [SOCKETIO_ROOM_USER_RENAMED]( { commit, state: { room } }, client: UserDTO ) {
      commit( M_SET_ROOM, room.renameUser( client ) )
    },

  },
  getters: {
    hasRoom: ({ room: { id } }) => id,
    roomOtherClients: ({ room: { clients }, user: { socketid } }) => clients.filter( c => c.socketid !== socketid ),
    roomClientsUserFirst: ({ user }, getters) => [user].concat( getters.roomOtherClients ),
    activeError: ({ error }) => error[0],
  },
})
