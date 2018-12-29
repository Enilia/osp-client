import Vue from 'vue';
import './registerHooks';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './socket';
import './material'
import './components'
import './directives'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
