import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import ServerSelector from '../views/ServerSelector.vue'
import GuildManage from '../views/manager/Root.vue'
import GuildDashboard from '../views/manager/Dashboard.vue'
import ModuleControl from '../views/manager/modules/Control.vue'
import MusicControl from '../views/manager/modules/Music.vue'
import DashboardFourOhFour from '../views/manager/FourOhFour.vue'
import FourOhFour from '../views/FourOhFour.vue'
import sockets from '../util/sockets'
import config from '../util/config' 

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
        name: "Module Control",
        component: ModuleControl,
      },
      {
        path: "modules/music",
        name: "Music Control",
        component: MusicControl
      },
      {
        path: "*",
        component: DashboardFourOhFour
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

const allowed404Paths = ["/"]

router.beforeEach(async (to, from, next) => {
  if(!/^(\/manage)/g.exec(to.path) && !allowed404Paths.includes(to.path)) return next();
  if(!Vue.cookie.get("token", { domain: config.inProduction ? config.production.cookieDomain : config.development.cookieDomain })) location.replace((config.inProduction ? config.production.url : config.development.url) + "/auth")
  if(store.state.guildSelection.length <= 0) {
    store.state.loading = true;
    await sockets
      .request("getUserGuilds", {
        token: Vue.cookie.get("token"),
      })
      .then((data) => {
        data.guilds.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        data.guilds.sort((a, b) =>
          !a.botIn && b.botIn ? 1 : a.botIn && !b.botIn ? -1 : 0
        );
        store.state.guildSelection = data.guilds;
        store.state.userPremium = data.user.isPremium;
        store.state.loading = false;
      }).catch(() => {
        store.state.loading = false;
      });
  }
  next();
})

export default router
