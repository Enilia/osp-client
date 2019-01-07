import Vue from 'vue'
import './bootstrap/registerHooks'
import './bootstrap/material'
import App from './App.vue'
import router from './router'
import store from './bootstrap/store'
import './bootstrap/vue-socket'
import './bootstrap/components'
import './bootstrap/directives'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
