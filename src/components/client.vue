<template>

  <md-card md-theme="white-card" class="md-primary md-elevation-1 client-card" :class="{ isUser }">
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

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class';
import { User } from '@/classes/user.class';

@Component<ClientComponent>({
  computed: {
    isUser() {
      return this.user.socketid === this.client.socketid
    }
  }
})
export default class ClientComponent extends Vue {

  @Prop({required: true})
  client!: User

  @State('user')
  user!: User


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

  &.isUser {
    outline: 1px dashed white;
  }

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
