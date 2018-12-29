<template>
  <div class="home">
    <md-card md-with-hover>
      <md-card-content class="create">
        <md-field>
          <label>Room</label>
          <md-input autofocus v-model="roomid"></md-input>
        </md-field>
        <md-button class="md-raised md-accent" @click="join">Join</md-button>
      </md-card-content>
    </md-card>

    <md-card md-with-hover>
      <md-card-content>
        <div>
          No room yet ? Create one here
        </div>
        <md-button class="md-raised md-primary" @click="create">Create</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class'

@Component
export default class HomeComponent extends Vue {

  roomid: string = ''

  create() {
    this.$socket.emit('createRoom')
  }

  join() {
    this.$socket.emit('joinRoom', this.roomid)
  }

}

</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: stretch;

    .md-card {
      flex: 1 1 auto;
      max-width: 400px;
      min-height: 200px;
      margin: 0;

      display: flex;
      flex-flow: column wrap;
      align-items: stretch;
      justify-content: center;

      .md-card-content {
        text-align: center;
      }
    }
  }

  .create {
    display: flex;
    align-items: baseline;
  }
</style>
