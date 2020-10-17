<template>
  <div id="content" data-uk-height-viewport="expand: true">
    <div class="uk-container uk-container-expand">
      <div v-if="musicData.module.enabled !== undefined">
        <h5 v-if="!musicData.module.enabled">
          This module is currently disabled
        </h5>
        <button
          class="uk-button uk-border-rounded"
          :class="
            musicData.module.enabled ? 'uk-button-primary' : 'uk-button-danger'
          "
          @click.prevent="toggleModule(musicData.module.keyword)"
          :disabled="changingModule"
        >
          Toggle
        </button>
        <h5 v-if="musicData.module.enabled && !musicData.playing">
          Nothing currently playing
        </h5>
        <div v-if="musicData.module.enabled && musicData.playing">
					<div uk-grid class="uk-grid-row-small uk-grid-column-small" style="margin-top: 40px;">
						<div
							class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
							uk-grid
						>
							<div class="uk-card-media-left uk-cover-container">
								<img :src="`https://i3.ytimg.com/vi/${musicData.queue.np.identifier}/hqdefault.jpg`" alt="" uk-cover />
								<canvas width="320" height="180"></canvas>
							</div>
							<div>
								<div class="uk-card-body songCardText">
									<p class="uk-card-title">{{ musicData.paused ? "Paused" : "Playing" }}</p>
									<p>{{ musicData.queue.np.title }}</p>
									<p>{{ musicData.queue.np.author }}</p>
									<p>{{ timePlayed }}/{{ musicData.queue.np.formattedLength }}</p>
								</div>
							</div>
						</div>
					</div>
					<h4>Next in queue</h4>
					<div v-for="(gueueItem, index) in musicData.queue.tracks" :key="index" uk-grid class="uk-grid-row-small uk-grid-column-small" style="margin-top: 40px;">
						<div
							class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
							uk-grid
						>
							<div class="uk-card-media-left uk-cover-container">
								<img :src="`https://i3.ytimg.com/vi/${gueueItem.identifier}/hqdefault.jpg`" alt="" uk-cover />
								<canvas width="320" height="180"></canvas>
							</div>
							<div>
								<div class="uk-card-body songCardText">
									<p>{{ gueueItem.title }}</p>
									<p>{{ gueueItem.author }}</p>
									<p>{{ gueueItem.formattedLength }}</p>
								</div>
							</div>
						</div>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sockets from "../../../util/sockets";

export default {
  name: "MusicControl",
  data: () => ({
    changingModule: false,
    musicData: {
      module: {},
      queue: {},
		},
		timePlayed: ""
  }),
  methods: {
		updateTimePlayed() {
			if(this.musicData.paused) this.musicData.queue.start += 1000;
			const played = new Date(Date.now() - this.musicData.queue.start)
			const hours = played.getHours();
			const minutes = played.getMinutes();
			const seconds = played.getSeconds();
			this.timePlayed = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
		},

    toggleModule(moduleKeyword) {
      this.changingModule = true;
      sockets
        .request("toggleModule", {
          token: this.$cookie.get("token"),
          guildId: this.$route.params.guildId,
          module: moduleKeyword,
        })
        .then((res) => {
          this.musicData.module.enabled = res.state;
          this.changingModule = false;
        })
        .catch(() => {
          this.changingModule = false;
        });
    },
	},
  mounted() {
    this.$store.state.loading = true;
    sockets
      .request("modules/music", {
        token: this.$cookie.get("token"),
        guildId: this.$route.params.guildId,
      })
      .then((res) => {
        this.musicData = res;
        this.$store.state.loading = false;
			
				this.updateTimePlayed();
				setInterval(() => {
					this.updateTimePlayed();
				}, 1000)
			})
      .catch(() => {
        this.$store.state.loading = false;
      });
  },
};
</script>

<style scoped>
@import url("../../../../public/css/dashboard.css");

.songCardText p {
  line-height: 14px;
}
</style>
