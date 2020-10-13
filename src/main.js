import Vue from 'vue'
import VueCookie from 'vue-cookie';
import VueScript from 'vue-script2'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VueScript)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
