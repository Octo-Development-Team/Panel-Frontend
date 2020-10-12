import Vue from 'vue'
import VueCookie from 'vue-cookie';
import VueScript from 'vue-script2'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VueScript)

const tokenMixin = {
  mounted() {
    if(!Vue.cookie.get("token")) return location.replace("http://localhost:8888/auth");
  }
}

new Vue({
  router,
  store,
  mixins: [tokenMixin],
  render: h => h(App)
}).$mount('#app')
