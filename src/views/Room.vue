<template>
  <div>
    <h2> #{{ room.id }} </h2>

    <transition-group name="fade-list" tag="div">
      <osp-client v-for="client in roomClients" :key="client.id" :client="client">
      </osp-client>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class';
import { Room } from '@/classes/room.class';
import { User } from '@/classes/user.class';
import { A_LEAVE_ROOM } from '../config/store-actions';


@Component<RoomComponent>({
  beforeRouteLeave(to, from, next) {
    this.leaveRoom()
    next()
  }
})
export default class RoomComponent extends Vue {

  @State('room')
  room!: Room

  @Getter('roomClientsUserFirst')
  roomClients!: User[]

  @Action(A_LEAVE_ROOM)
  leaveRoom!: () => void

}

</script>

<style lang="scss">

.fade-list-leave-to {
  transform: translateX(50%);
}

</style>
