<template>
  <div>
    <h2> #{{ room.id }} </h2>

    <md-card v-for="client in room.clients" :key="client.id" md-theme="white-card" class="md-primary md-elevation-1 client-card">
      <md-card-header>
        <div class="md-title" v-if="client.nickname"> {{ client.nickname }}</div>
        <div class="md-title" v-else>@{{ client.id }}</div>
        <div class="md-subhead">@{{ client.id }}</div>
      </md-card-header>
      <md-card-content>

        <md-card class="osp-card md-elevation-3">
          <md-card-content>
            ?
          </md-card-content>
        </md-card>

      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class';
import { Room } from '@/interfaces/room.interface';
import { User } from '@/interfaces/user.interface';


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

  @State('user')
  user!: User

  @Action('leaveRoom')
  leaveRoom!: () => void

}

</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme("white-card", (
  primary: md-get-palette-color(grey, 900)
));

@import "~vue-material/dist/base/theme";
@import "~vue-material/dist/components/MdCard/theme";

.md-card.client-card {
  width: 250px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;

  .md-title {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.osp-card {
  height: 200px;

  .md-card-content {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 5em;
  }
}
</style>
