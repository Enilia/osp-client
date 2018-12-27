<template>

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
