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

    <md-snackbar md-position="center" :md-duration="duration" :md-active="active" @update:mdActive="clearError" md-persistent>
      <span v-if="error">{{ error.message }}</span>
      <md-button class="md-primary" @click="clearError">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class'
import { OSPError } from '@/classes/error.class';
import { A_CLEAR_ERROR } from '@/config/store-actions';

@Component
export default class AppComponent extends Vue {

  @Getter('activeError')
  error?: OSPError

  @Action(A_CLEAR_ERROR)
  clearError!: () => void

  duration = 4000

  active = false

  @Watch('error')
  updateActive( newError?: OSPError, lastError?: OSPError ) {
    if( newError !== lastError ) this.active = false
    if( newError ) requestAnimationFrame(() => this.active = true)
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

</style>

<style lang="scss">

.fade-list-move, .fade-list-enter-to, .fade-list-leave-to {
  transition: all .7s;
}
.fade-list-enter, .fade-list-leave-to {
  opacity: 0;
}
.fade-list-leave-active {
  position: absolute;
}

.fade-enter-active, .fade-leave-active {
  transition: all .7s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

</style>
