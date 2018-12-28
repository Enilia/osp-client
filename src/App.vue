<template>
  <div>
    <md-app>
      <md-app-toolbar>
        <span class="md-title">Online Scrum Poker</span>
        <div class="spacer"></div>
        <osp-user></osp-user>
      </md-app-toolbar>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>

.spacer {
  flex: 1 0 auto;
}

.md-toolbar {
  flex-wrap: nowrap;
}

</style>
