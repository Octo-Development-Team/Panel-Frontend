import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import ServerSelector from '../views/ServerSelector.vue'
import GuildManage from '../views/GuildManage/Root.vue'
import GuildDashboard from '../views/GuildManage/Dashboard.vue'
import GuildModules from '../views/GuildManage/Modules.vue'
import FourOhFour from '../views/FourOhFour.vue'
import sockets from '../util/sockets'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Server Selector',
    component: ServerSelector
  },
  {
    path: "/manage",
    name: "Mange Guild",
    redirect: "/"
  },
  {
    path: '/manage/:guildId',
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
  },
  {
    path: "*",
    component: FourOhFour
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(!to.path.startsWith("/manage/") && !to.path.endsWith("e/")) return next();
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
      }).catch(() => {
        store.state.loading = false;
      });
  }
  next();
})

export default router
