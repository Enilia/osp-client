<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Your Vue.js App</h1>
    nickname: {{ nickname }}
    <br><input v-model="newNickname"> <button type="button" @click="rename">rename</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class'

@Component
export default class HomeComponent extends Vue {

  @State( state => state.user.nickname )
  nickname!: string

  newNickname: string = ''

  rename() {
    this.$socket.emit('renameUser', this.newNickname)
  }

}

</script>
