<template>
  <div id="content" data-uk-height-viewport="expand: true">
    <div class="uk-container uk-container-expand">
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
    })
  },
};
</script>

<style scoped>
@import url("../../../public/css/dashboard.css");
</style>
