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
        <p v-if="musicData.module.enabled && musicData.playing">Queue time {{ formatTime(new Date(this.musicData.queue.np.lengthMS + (this.musicData.queue.tracks.length > 0 ? this.musicData.queue.tracks.reduce((acc, it) => acc + it.lengthMS, this.musicData.queue.tracks[0].lengthMS) : 0))) }}</p>
        <h5 v-if="musicData.module.enabled && !musicData.playing">
          Nothing currently playing
        </h5>
        <div v-if="musicData.module.enabled && musicData.playing">
          <div class="uk-grid uk-grid-medium" data-uk-grid>
            <div class="uk-width-1-2@l">
              <div
                class="uk-card uk-card-default uk-card-hover uk-border-rounded uk-grid-collapse uk-child-width-1-2@s uk-margin"
                uk-grid
              >
                <div class="uk-card-media-left uk-cover-container">
                  <a :href="musicData.queue.np.link" target="_blank">
                    <img
                      :src="
                        `https://i.ytimg.com/vi/${musicData.queue.np.identifier}/hqdefault.jpg`
                      "
                      alt=""
                      uk-cover
                    />
                  </a>
                  <canvas width="600" height="400"></canvas>
                </div>
                <div>
                  <div class="uk-card-body son">
                    <p class="uk-card-title">
                        {{ musicData.paused ? "Paused" : "Playing" }}
                      </p>
                      <p>{{ musicData.queue.np.title }}</p>
                      <p>{{ musicData.queue.np.author }}</p>
                      <p>
                        {{ timePlayed }}/{{
                          musicData.queue.np.formattedLength
                        }}
                      </p>
                  </div>
                </div>
              </div>
              <h4>Next in queue</h4>
              <div
                v-for="(queueItem, index) in musicData.queue.tracks"
                :key="index"
                class="uk-card uk-card-default uk-card-hover uk-border-rounded uk-grid-collapse uk-child-width-1-2@s uk-margin"
                uk-grid
              >
                <div class="uk-card-media-left uk-cover-container">
                  <a :href="queueItem.link" target="_blank">
                    <img
                      :src="
                        `https://i.ytimg.com/vi/${queueItem.identifier}/hqdefault.jpg`
                      "
                      alt=""
                      uk-cover
                    />
                  </a>
                  <canvas width="600" height="400"></canvas>
                </div>
                <div>
                  <div class="uk-card-body son">
                      <p>{{ queueItem.title }}</p>
                      <p>{{ queueItem.author }}</p>
                      <p>
                        {{
                          queueItem.formattedLength
                        }}
                      </p>
                  </div>
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
    timePlayed: "",
  }),
  methods: {
    formatTime(date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    },
    updateTimePlayed() {
      if(this.musicData.paused || !this.musicData.queue) return;
      const played = new Date(Date.now() - this.musicData.queue.startTime);
      this.timePlayed = this.formatTime(played);
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
    async listenQueue() {
      await sockets.request("modules/listen", {
        token: this.$cookie.get("token"),
        guildId: this.$route.params.guildId,
        state: "join"
      }).then(res => {
        if(res.listening) {
          this.$store.state.socket.on("musicQueueUpdate", musicData => {
            this.musicData = musicData;
          })
          const quitListener =  () => {
            this.$store.state.socket.removeListener(quitListener);
            this.listenQueue();
          };
          this.$store.state.socket.on("musicQueueQuit", quitListener)
        }
      });
    }
  },
  async mounted() {
    this.$store.state.loading = true;
    const getResult = await sockets
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
        }, 1000);
      })
      .catch((err) => {
        return err;
      });

    if(getResult instanceof Error) {
      console.error(getResult)
      this.$store.state.loading = false;
      return this.$store.commit("pushAlert", { type: "danger", message: "Failed to get music information." })
    }

    await this.listenQueue();

    this.$store.state.loading = false;
  },
  async beforeDestroy() {
    await sockets.request("modules/listen", {
      token: this.$cookie.get("token"),
      guildId: this.$route.params.guildId,
      state: "leave"
    })
  }
};
</script>

<style scoped>
@import url("../../../../public/css/dashboard.css");

.songCardText p {
  line-height: 14px;
}
</style>
