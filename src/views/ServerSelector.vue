<template>
  <div
    id="content"
    data-uk-height-viewport="expand: true"
    style="margin-left: 0;"
  >
    <nav
      class="uk-navbar-container"
      style="position: absolute; top: 0; width: 100%; padding: 0; z-index: 100; background-color: #1a1a1a !important; height: 60px;"
      uk-navbar
    >
      <div class="uk-navbar-left uk-margin-small-left">
        <ul class="uk-navbar-nav">
          <li>
            <a href="https://octodev.xyz" style="font-family: 'Roboto', sans-serif !important;"
              >Home</a
            >
          </li>
          <!--<li>
            <router-link to="/" style="font-family: 'Roboto', sans-serif !important;"
              >Server Selector</router-link
            >
          </li>
          <li>
            <a href="https://" style="font-family: 'Roboto', sans-serif !important;"
              >Find Servers</a
            >
          </li>-->
        </ul>
      </div>

      <div class="uk-navbar-right uk-margin-small-right">
        <ul class="uk-navbar-nav">
          <li>
            <a class="uk-logo profile-img"
              ><img
                :src="`https://cdn.discordapp.com/avatars/${userJwt.id}/${userJwt.avatar}.png`"
                class="uk-border-circle"
            /></a>
          </li>
          <li><a style="text-transform: none !important;" :style="$store.state.userPremium ? 'color: #FFD700;' : ''">{{ userJwt.username }}#{{userJwt.discriminator}}</a></li>
          <li>
            <a @click.prevent="signOut()"><span uk-icon="sign-out"></span></a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="uk-container uk-container-expand" style="margin-top: 3%">
      <div class="uk-grid uk-grid-medium" uk-grid>
        <div
          class="uk-width-1-4@l uk-text-center"
          v-for="guild in this.$store.state.guildSelection"
          :key="guild.id"
        >
          <div
            class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
          >
            <div class="uk-card-header">
              <div class="uk-grid uk-grid-small">
                <div class="uk-width-expand">
                  <h4>{{ guild.name }}</h4>
                </div>
              </div>
            </div>
            <div class="uk-card-body">
              <div class="uk-align-center">
                <img
                  :src="
                    `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                  "
                  alt=""
                  class="uk-border-circle"
                  style="width: 128px; height: 128px"
                  v-if="guild.icon"
                />
                <img
                  src="https://cdn.discordapp.com/attachments/576731635807027230/766000532379795497/Discord_icon.png"
                  alt=""
                  class="uk-border-circle"
                  style="width: 128px; height: 128px"
                  v-if="!guild.icon"
                />
              </div>
              <!--  -->
              <router-link :to="`/manage/${guild.id}`" v-if="guild.botIn"
                ><button class="uk-button uk-button-primary uk-border-rounded">
                  Select
                </button></router-link
              >
              <a
                :href="
                  `https://discord.com/api/oauth2/authorize?client_id=750145544093171802&permissions=8&redirect_uri=https%3A%2F%2Fauth.octodev.xyz%2Fauth%2Fcallback&scope=bot&guild_id=${guild.id}`
                "
                v-if="!guild.botIn"
                ><button class="uk-button uk-button-danger uk-border-rounded">
                  Invite
                </button></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sockets from "../util/sockets";
import jwt from '../util/jwt'
import { prod } from '../util/config'

export default {
  name: "Home",
  data: () => ({
    userJwt: {},
  }),
  methods: {
    signOut() {
      this.$cookie.delete("token");
      location.replace(prod ? "https://octodev.xyz/" : "http://localhost:8888");
    }
  },
  mounted() {
    if (this.$store.state.guildSelection.length <= 0)
      this.$store.state.loading = true;
    sockets
      .request("getUserGuilds", {
        token: this.$cookie.get("token"),
      })
      .then((data) => {
        data.guilds.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        data.guilds.sort((a, b) =>
          !a.botIn && b.botIn ? 1 : a.botIn && !b.botIn ? -1 : 0
        );
        this.$store.state.guildSelection = data.guilds;
        this.$store.state.userPremium = data.user.isPremium;
        this.$store.state.loading = false;
      })
      .catch(() => {
        this.$store.state.loading = false;
      });
      
      this.userJwt = jwt.parseJwt(this.$cookie.get("token")).discordData;
  }
};
</script>

<style scoped>
li a {
  text-transform: none !important;
}

.uk-navbar-nav, .uk-navbar-nav a {
  height: 100% !important;
}
</style>
