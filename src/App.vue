<template>
  <div>
    <md-app>
      <md-app-toolbar>
        <span class="md-title">Online Scrum Poker</span>
        <div class="spacer"></div>
        <osp-user></osp-user>
      </md-app-toolbar>
    </md-app>
    <router-view/>
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
