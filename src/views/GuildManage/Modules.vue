<template>
  <div id="content" data-uk-height-viewport="expand: true">
    <div class="uk-container uk-container-expand">
      <p v-if="botModules.length > 0">Red colored modules do not have their functionality implemented yet</p><br>
      <div class="uk-grid uk-grid-medium" uk-grid>
        <ModuleCard v-for="botModule in botModules" :key="botModule.keyword" :module="botModule" />
      </div>
    </div>
  </div>
</template>

<script>
import ModuleCard from '../../components/ModuleCard';
import sockets from '../../util/sockets';

export default {
  name: "GuildModules",
  components: {
    ModuleCard
  },
  data: () => ({
    botModules: [],
  }),
  mounted() {
    this.$store.state.loading = true;
    sockets.request("getModules", {
      token: this.$cookie.get("token"),
      guildId: this.$route.params.guildId,
    }).then(res => {
      this.$store.state.loading = false;
      this.botModules = res.modules;
      this.botModules.sort((a, b) => !a.implemented && b.implemented ? 1 : a.implemented && !b.implemented ? -1 : 0)
    }).catch(() => {
      this.$store.state.loading = false;
    })
  },
};
</script>

<style scoped>
@import url("../../../public/css/dashboard.css");
</style>
