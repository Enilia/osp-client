<template>
  <div>
    <h2> #{{ room.id }} </h2>

    <osp-client v-for="client in roomClients" :key="client.id" :client="client">
    </osp-client>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class';
import { Room } from '@/classes/room.class';
import { User } from '@/classes/user.class';


@Component<RoomComponent>({
  beforeRouteLeave(to, from, next) {
    this.$socket.emit('leaveRoom')
    this.leaveRoom()
    next()
  }
})
export default class RoomComponent extends Vue {

  @State('room')
  room!: Room

  @Getter('roomClientsUserFirst')
  roomClients!: User[]

  @Action('leaveRoom')
  leaveRoom!: () => void

}

</script>

<style lang="scss">
</style>
