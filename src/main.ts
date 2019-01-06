import Vue from 'vue'
import './bootstrap/registerHooks'
import App from './App.vue'
import router from './router'
import store from './bootstrap/store'
import './bootstrap/vue-socket'
import './bootstrap/material'
import './bootstrap/components'
import './bootstrap/directives'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
