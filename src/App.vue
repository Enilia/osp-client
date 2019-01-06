<template>
  <div>
    <md-app>
      <md-app-toolbar>
        <router-link :to="{name: 'home'}"><span class="md-title">Online Scrum Poker</span></router-link>
        <div class="spacer"></div>
        <osp-user></osp-user>
      </md-app-toolbar>
      <md-app-content>
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </md-app-content>
    </md-app>

    <md-snackbar md-position="center" :md-duration="duration" :md-active="!!error.message" @update:mdActive="hide" md-persistent>
      <span>{{ error.message }}</span>
      <md-button class="md-primary" @click="hide">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class'
import { SOCKETIO_ERROR } from '@/store/socket.events';
import { OSPError, OSPErrorDTO } from '@/classes/error.class';
import { CLEAR_ERROR } from '@/store/store-actions';

@Component
export default class AppComponent extends Vue {

  @State('error')
  error!: OSPError

  @Action(CLEAR_ERROR)
  clearError!: () => void

  duration = 4000

  hide() {
    this.clearError()
  }

}

</script>

<style lang="scss" scoped>

.spacer {
  flex: 1 0 auto;
}

.md-toolbar {
  flex-wrap: nowrap;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

</style>
