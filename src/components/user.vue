<template>
  <div>
    <form novalidate @submit.prevent="blur">
      <md-field>
        <md-icon>person</md-icon>
        <label v-osp-width="user.id" @osp-width-change="useridWidth = $event"> @{{ user.id }} </label>
        <md-input :value="user.nickname" ref="input" @blur="rename(newNickname)" @input="newNickname = $event" :style="{ width: inputWidth + 'px' }"></md-input>
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
import { State, Action } from 'vuex-class';
import { User } from '@/classes/user.class';
import { A_RENAME_USER } from '@/config/store-actions';

@Component<UserComponent>({
  computed: {
    inputWidth() {
      return Math.max( this.newNicknameWidth, this.useridWidth ) + 5
    }
  }
})
export default class UserComponent extends Vue {

  @State('user')
  user!: User

  newNickname: string = ''

  newNicknameWidth = 0
  useridWidth = 0

  mounted() {
    this.newNickname = this.user.nickname
  }

  blur() {
    const mdInput = (this.$refs.input as Vue)
    const input = mdInput.$el as HTMLInputElement
    input.blur()
  }

  @Action(A_RENAME_USER)
  rename!: ( newNickname: string ) => void

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
