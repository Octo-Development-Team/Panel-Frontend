import Vue from 'vue'
import VueRouter from 'vue-router'
import ServerSelector from '../views/ServerSelector.vue'
import GuildManage from '../views/GuildManage/Root.vue'
import GuildDashboard from '../views/GuildManage/Dashboard.vue'
import GuildModules from '../views/GuildManage/Modules.vue'

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
    children: [
      {
        path: "",
        name: "Guild Dashboard",
        component: GuildDashboard
      },
      {
        path: "modules",
        name: "Guild Modules",
        component: GuildModules
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
