<template>
  <div>
    <md-app>
      <md-app-toolbar>
        <span class="md-title">Online Scrum Poker</span>
        <div class="spacer"></div>
        <osp-user></osp-user>
      </md-app-toolbar>
      <md-app-content>
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </md-app-content>
    </md-app>

    <md-snackbar md-position="center" :md-duration="duration" :md-active="!!error.message" md-persistent>
      <span>{{ error.message }}</span>
      <md-button class="md-primary" @click="hide">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class'
import { SOCKETIO_ERROR } from '@/store/socket.events';

@Component
export default class AppComponent extends Vue {

  @State('error')
  error!: { message: string }

  @Mutation(SOCKETIO_ERROR)
  setError!: ( error: { message: string } ) => void

  @Watch('error')
  enforceDuration() {
    clearTimeout(this.durationTimeoutId)
    if(this.error.message) {
      this.durationTimeoutId = setTimeout(() => this.hide(), this.duration)
    }
  }

  durationTimeoutId?: number

  duration = 4000

  hide() {
    this.setError({message:''})
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
