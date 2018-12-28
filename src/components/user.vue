<template>
  <div>
    <form novalidate @submit.prevent="rename">
      <md-field>
        <md-icon>person</md-icon>
        <label v-osp-width="userid" @osp-width-change="useridWidth = $event"> @{{ userid }} </label>
        <md-input :value="nickname" ref="input" @blur="rename" @input="newNickname = $event" :style="{ width: inputWidth + 'px' }"></md-input>
        <md-icon>edit</md-icon>
      </md-field>
    </form>

    <div v-osp-width.hide="newNickname" @osp-width-change="newNicknameWidth = $event" class="nicknameWidth">
      {{ newNickname }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component<UserComponent>({
  computed: {
    inputWidth() {
      return Math.max( this.newNicknameWidth, this.useridWidth ) + 5
    }
  }
})
export default class UserComponent extends Vue {

  @State( state => state.user.id )
  userid!: string

  @State( state => state.user.nickname )
  nickname!: string

  newNickname: string = ''

  newNicknameWidth = 0
  useridWidth = 0

  mounted() {
    this.newNickname = this.nickname
  }

  rename() {
    if(this.newNickname !== this.nickname)
      this.$socket.emit('renameUser', this.newNickname)
    const mdInput = (this.$refs.input as Vue)
    const input = mdInput.$el as HTMLInputElement
    input.blur()
  }

}

</script>


<style lang="scss" scoped>
.md-field {
  &:after {
    background-color: transparent;
  }

  .md-icon:after {
    background-color: transparent;
  }
}
.md-input {
  + .md-icon {
    opacity: 0;
  }

  &:focus, &:hover {
    + .md-icon {
      opacity: 1;
    }
  }
}

.nicknameWidth {
  font-size: 16px;
}
</style>
