<template>
  <div class="home">
    <md-card md-with-hover>
      <md-card-content class="create">
        <md-field>
          <label>Room</label>
          <md-input autofocus></md-input>
        </md-field>
        <md-button class="md-raised md-accent">Join</md-button>
      </md-card-content>
    </md-card>

    <md-card md-with-hover>
      <md-card-content>
        <div>
          No room yet ? Create one here
        </div>
        <md-button class="md-raised md-primary">Create</md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class'

@Component
export default class HomeComponent extends Vue {


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
