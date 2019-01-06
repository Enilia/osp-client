<template>

  <md-card md-theme="white-card" class="md-primary md-elevation-1 client-card" :class="{ isUser, isOwner }">
    <md-card-header>
      <div class="md-title" v-if="client.nickname"> {{ client.nickname }}</div>
      <div class="md-title" v-else>@{{ client.id }}</div>
      <div class="md-subhead">
        <div class="client_id">@{{ client.id }}</div>
      </div>
      <md-chip v-if="isOwner" class="md-accent isOwner">Owner</md-chip>
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
    },
    isOwner() {
      return this.client.socketid === this.owner.socketid
    }
  }
})
export default class ClientComponent extends Vue {

  @Prop({required: true})
  client!: User

  @State('user')
  user!: User

  @State( ({room}) => room.owner )
  owner!: User

}


</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme("white-card", (
  primary: md-get-palette-color(grey, 900),
));

@import "~vue-material/dist/base/theme";
@import "~vue-material/dist/components/MdCard/theme";
@import "~vue-material/dist/components/MdChips/theme";

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
    position: relative;
    z-index: 10;
  }

  .md-chip.isOwner {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 0;
    transform: scale(0.7);
    transform-origin: top right;
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
