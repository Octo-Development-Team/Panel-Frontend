import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import ServerSelector from '../views/ServerSelector.vue'
import GuildManage from '../views/GuildManage/Root.vue'
import GuildDashboard from '../views/GuildManage/Dashboard.vue'
import GuildModules from '../views/GuildManage/Modules.vue'
import sockets from '../util/sockets'

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

router.beforeEach(async (to, from, next) => {
  if(!Vue.cookie.get("token")) location.replace("http://localhost:8888/auth")
  if(store.state.guildSelection.length <= 0) {
    store.state.loading = true;
    await sockets
      .request("getUserGuilds", {
        token: Vue.cookie.get("token"),
      })
      .then((data) => {
        store.state.guildSelection = data.guilds;
        store.state.loading = false;
      });
  }
  next();
})

export default router
