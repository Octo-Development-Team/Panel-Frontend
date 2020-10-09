<template>
  <div class="serverSelector">
    <router-link v-for="guild in this.$store.state.guildSelection" :key="guild.id" :to="`/${guild.id}`">
      <div style="border: 2px solid black; display: inline-block; float: left; margin: 20px;">
        <img :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`" alt="Server Icon" v-if="guild.icon">
        <img src="https://cdn.discordapp.com/emojis/755491953793040556.png?v=1" alt="Server Icon" v-if="!guild.icon">
        <h5>{{ guild.name }}</h5>
      </div>
    </router-link>
  </div>
</template>

<script>
import sockets from '../util/sockets'

export default {
  name: 'Home',
  mounted() {
    sockets.request("getUserGuilds", {
      token: this.$cookie.get("token")
    }).then(data => {
      console.log(data.guilds)
      this.$store.state.guildSelection = data.guilds;
    })
  }
}
</script>
