import Vue from 'vue'
import VueRouter from 'vue-router'
import ServerSelector from '../views/ServerSelector.vue'
import GuildManage from '../views/GuildManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Server Selector',
    component: ServerSelector
  },
  {
    path: '/:guildId',
    name: 'Manage Guild',
    component: GuildManage,
    /*children: [
      {

      },
      {

      }
    ]*/
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
