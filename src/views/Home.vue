<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Your Vue.js App</h1>
    nickname:
    <input v-model="nickname"> <button type="button" @click="rename">rename</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  sockets: {
    connect() {
      console.log('socket connected')
    },
    userRenamed( this: HomeComponent, newName: string ) {
      console.log(`renamed to ${newName}`)
      this.nickname = newName
    }
  }
})
export default class HomeComponent extends Vue {

  nickname: string = ''

  rename() {
    this.$socket.emit('renameUser', this.nickname)
  }

}

</script>
