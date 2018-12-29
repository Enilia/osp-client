<template>
  <div class="home">
    <md-card md-with-hover>
      <md-card-content>
        <form @submit.prevent="valid && join(roomid)" class="create">
          <md-field md-clearable>
            <label>Room</label>
            <span class="md-prefix">#</span>
            <md-input v-autofocus v-model="roomid" required maxlength="6"></md-input>
          </md-field>
          <md-button type="submit" class="md-raised md-accent" :disabled="!valid">Join</md-button>
        </form>
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
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component<HomeComponent>({
  computed: {
    valid() {
      return this.isValid(this.roomid)
    }
  }
})
export default class HomeComponent extends Vue {

  roomid: string = ''

  @Watch('$route.query.join', { immediate: true })
  checkJoin( join: string ) {
    this.$router.replace({ query: {} })
    if(join && this.isValid(join)) {
      this.join( join as string )
    }
  }

  isValid( id: string ) {
    return /^[a-z0-9]{6}$/.test(id)
  }

  create() {
    this.$socket.emit('createRoom')
  }

  join( id: string ) {
    this.$socket.emit('joinRoom', id)
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
