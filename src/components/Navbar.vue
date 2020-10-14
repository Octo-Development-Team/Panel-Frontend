<template>
  <div>
    <aside id="left-col" class="uk-light uk-visible@m">
      <div class="left-content-box uk-grid uk-grid-collapse" style="background-color: #1a1a1a; padding: 10px;" uk-grid>
        <img :src="`https://cdn.discordapp.com/avatars/${userJwt.id}/${userJwt.avatar}.png`" alt="" class="uk-border-circle profile-img uk-width-1-2@l" style="margin: 0; margin-right: 10px;" v-if="userJwt.id && userJwt.avatar">
        <h4 class="uk-text-center uk-margin-remove-vertical text-light uk-width-1-2@l" style="text-align: center; position: relative; top: 50%; -ms-transform: translateY(25%);
        -webkit-transform: translateY(25%);
        transform: translateY(25%);">{{ !userJwt.username ? "" : userJwt.username.length > 16 ? userJwt.username.slice(0, 12) + "…" : userJwt.username }}</h4>
      </div>
      <div class="left-content-box">
        <img
          :src="guild.iconUrl"
          alt=""
          class="uk-border-circle profile-img"
        />
        <h4 class="uk-text-center uk-margin-remove-vertical text-light">
          {{ guild.name }}
        </h4>
      </div>

      <div class="left-nav-wrap uk-margin-top">
        <ul class="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
          <li>
            <router-link :to="`/manage/${$route.params.guildId}`"
              ><span
                data-uk-icon="icon: home"
                class="uk-margin-small-right"
              ></span
              >Home</router-link
            >
          </li>
          <li>
            <router-link :to="`/manage/${$route.params.guildId}/modules`"
              ><span
                data-uk-icon="icon: cog"
                class="uk-margin-small-right"
              ></span
              >Modules</router-link
            >
          </li>
          <li>
            <router-link :to="`/manage/${$route.params.guildId}/`"
              ><span
                data-uk-icon="icon: list"
                class="uk-margin-small-right"
              ></span
              >Commands</router-link
            >
          </li>
        </ul>
      </div>
      <div class="bar-bottom">
        <ul
          class="uk-subnav uk-flex uk-flex-center uk-child-width-1-5"
          data-uk-grid
        >
          <li>
            <a
              href="#"
              class="uk-icon-link"
              data-uk-icon="icon: home"
              title="Home"
              data-uk-tooltip
              @click="selectServer()"
            ></a>
          </li>
          <li>
            <a
              href="#"
              class="uk-icon-link"
              data-uk-tooltip="Sign out"
              data-uk-icon="icon: sign-out"
              @click.prevent="signOut()"
            ></a>
          </li>
        </ul>
      </div>
    </aside>
    <a
      class="uk-navbar-toggle uk-hidden@m uk-position-top-right uk-position-z-index"
      data-uk-toggle
      data-uk-navbar-toggle-icon
      href="#offcanvas-nav"
    ></a>
    <div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
      <div
        class="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide"
      >
        <button
          class="uk-offcanvas-close uk-close uk-icon"
          type="button"
          data-uk-close
        ></button>
        <ul class="uk-nav uk-nav-default">
          <li>
            <router-link :to="`/manage/${$route.params.guildId}/`"
              ><span
                data-uk-icon="icon: home"
                class="uk-margin-small-right"
              ></span
              >Home</router-link
            >
          </li>
          <li>
            <router-link :to="`/manage/${$route.params.guildId}/modules`"
              ><span
                data-uk-icon="icon: cog"
                class="uk-margin-small-right"
              ></span
              >Modules</router-link
            >
          </li>
          <li>
            <router-link :to="`/manage/${$route.params.guildId}/`"
              ><span
                data-uk-icon="icon: list"
                class="uk-margin-small-right"
              ></span
              >Commands</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { prod } from '../util/config' 
import jwt from '../util/jwt';

export default {
    name: "GuildManageNavbar",
    data: () => ({
        guild: {
            name: "",
            iconUrl: ""
        },
        userJwt: {}
    }),
    methods: {
        signOut() {
            this.$cookie.delete("token");
            location.replace(prod ? "https://octodev.xyz/" : "http://localhost:8888")
        },
        selectServer() {
            this.$router.push("/");
        }
    },
    mounted() {
        const guild = this.$store.state.guildSelection.find(it => it.id === this.$route.params.guildId)
        if(!guild) return this.$router.push("/");

        this.guild.name = guild.name;
        this.guild.iconUrl = guild.icon ? `https://cdn.discordapp.com/icons/${this.$route.params.guildId}/${guild.icon}.png?size=64` : "https://cdn.discordapp.com/attachments/576731635807027230/766000532379795497/Discord_icon.png"
    
        this.userJwt = jwt.parseJwt(this.$cookie.get("token")).discordData;
    }
}
</script>