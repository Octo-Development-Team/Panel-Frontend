<template>
  <div
    id="content"
    data-uk-height-viewport="expand: true"
    style="margin-left: 0;"
  >
    <div class="uk-container uk-container-expand">
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
                    `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
                  "
                  alt=""
                  class="uk-border-circle"
                  style="width: 128px; height: 128px"
                  v-if="guild.icon"
                />
                <img
                  src="https://cdn.discordapp.com/emojis/755491953793040556.png?v=1"
                  alt=""
                  class="uk-border-circle"
                  style="width: 128px; height: 128px"
                  v-if="!guild.icon"
                />
              </div>
              <router-link :to="`/manage/${guild.id}`"
                ><button class="uk-button primary uk-border-rounded">
                  Select
                </button></router-link
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

export default {
  name: "Home",
  mounted() {
    if (this.$store.state.guildSelection.length <= 0)
      this.$store.state.loading = true;
    sockets
      .request("getUserGuilds", {
        token: this.$cookie.get("token"),
      })
      .then((data) => {
        this.$store.state.guildSelection = data.guilds;
        this.$store.state.loading = false;
      }).catch(() => {
        this.$store.state.loading = false;
      });
  },
};
</script>

<style></style>
