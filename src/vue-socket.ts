import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import $socket from './socket-instance'
import store from './store/store'
import { SOCKETIO_STORE_PREFIX } from './store/socket.events'

const identity = (s: string) => s

Vue.use(
  VueSocketIOExt,
  $socket,
  {
    store,
    actionPrefix: SOCKETIO_STORE_PREFIX,
    mutationPrefix: SOCKETIO_STORE_PREFIX,
    eventToMutationTransformer: identity,
    eventToActionTransformer: identity,
  },
)
