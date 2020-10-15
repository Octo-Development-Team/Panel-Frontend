<template>
  <div class="guildManage">
    <Navbar />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar';

export default {
  name: "GuildManage",
  components: {
    Navbar
  }
}
</script>
