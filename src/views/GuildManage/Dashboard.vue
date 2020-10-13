<template>
  <div class="guildDashboard">
    <div id="content" data-uk-height-viewport="expand: true">
      <div class="uk-container uk-container-expand">
        <div
          class="uk-grid uk-grid-divider uk-grid-medium uk-child-width-1-2 uk-child-width-1-4@l uk-child-width-1-5@xl"
          data-uk-grid
        >
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:world"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Region</span
            >
            <h1 class="uk-heading-primary uk-margin-remove  uk-text-primary">
              {{ guildData.region || 0 }}
            </h1>
          </div>
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:users"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Members</span
            >
            <h1 class="uk-heading-primary uk-margin-remove uk-text-primary">
              {{ guildData.memberCount || 0 }}
            </h1>
            <div class="uk-text-small"></div>
          </div>
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:hashtag"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Channels</span
            >
            <h1 class="uk-heading-primary uk-margin-remove  uk-text-primary">
              {{ guildData.channelCount || 0 }}
            </h1>
          </div>
          <div>
            <span class="uk-text-small"
              ><span
                data-uk-icon="icon:tag"
                class="uk-margin-small-right uk-text-primary"
              ></span
              >Categories</span
            >
            <h1 class="uk-heading-primary uk-margin-remove  uk-text-primary">
              {{ guildData.categoryCount || 0 }}
            </h1>
          </div>
        </div>
        <div class="uk-grid uk-grid-medium" data-uk-grid>
          <div class="uk-width-1-2@l">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
            >
              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small">
                  <div class="uk-width-expand">
                    <h4>Bot Configuration Settings</h4>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <div class="uk-grid-medium" uk-grid>
                  <div>
                    <form action="">
                      <div class="uk-margin">
                        <div class="uk-grid-small" uk-grid>
                          <div>
                            <div class="uk-form-controls">
                              <input
                                class="uk-input uk-width-large uk-text-primary"
                                id="nickname"
                                type="text"
                                :placeholder="'Nickname: ' + (guildData.nickname || 'OctoBot')"
                                v-model="nickname"
                              />
                            </div>
                          </div>
                          <div>
                            <button class="uk-button primary uk-border-rounded" @click.prevent="updateNickname()">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="uk-margin-remove-top">
                    <form action="">
                      <div class="uk-margin">
                        <div class="uk-grid-small" uk-grid>
                          <div>
                            <div class="uk-form-controls">
                              <input
                                class="uk-input uk-width-large uk-text-primary"
                                id="nickname"
                                type="text"
                                :placeholder="'Prefix: ' + (guildData.prefix || 'Prefix')"
                                v-model="prefix"
                              />
                            </div>
                          </div>
                          <div>
                            <button class="uk-button primary uk-border-rounded" @click.prevent="updatePrefix()">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="uk-width-1-2@l">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
            >
              <div class="uk-position-cover uk-border-rounded" style="background-color: rgba(0, 0, 0, 0.6);"></div>
              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small">
                  <div class="uk-width-expand">
                    <h4>Server Listing Information</h4>
                  </div>
                </div>
              </div>
              <div class="uk-card-body">
                <form action="">
                  <label
                    ><input class="uk-checkbox" type="checkbox"/> List on
                    Server List</label
                  >
                  <div class="uk-grid-small uk-margin-top" uk-grid>
                    <div>
                      <div>
                        <label class="uk-form-label uk-text-muted" for="form-stacked-text"
                          >Invite URL</label
                        >
                        <div class="uk-form-controls">
                          <input
                            class="uk-input"
                            id="form-stacked-text"
                            type="text"
                            placeholder="discord.gg/octo"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label class="uk-form-label uk-text-muted" for="form-stacked-select"
                          >Server Category</label
                        >
                        <div class="uk-form-controls">
                          <select class="uk-select" id="form-stacked-select">
                            <option>Development</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <form class="uk-margin-top" action="">
                  <div class="uk-margin">
                    <div class="uk-form-label uk-text-muted">Server Description</div>
                    <div class="uk-form-controls">
                      <textarea
                        class="uk-textarea uk-margin-bottom"
                        rows="5"
                        placeholder="Enter the description of your amazing server right in this box!"
                      ></textarea>
                        <button class="uk-button primary uk-border-rounded" @click.prevent="">
                          Save
                        </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="uk-width-1-1@l">
            <div
              class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
            >
              <div class="uk-position-cover uk-border-rounded" style="background-color: rgba(0, 0, 0, 0.6);"></div>
              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small">
                  <div class="uk-width-expand"><h4>Recent Action Log</h4></div>
                </div>
              </div>
              <div class="uk-card-body">
                <table class="uk-table logs">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sockets from "../../util/sockets";

export default {
  name: "GuildDashboard",
  data: () => ({
    guildData: {},
    prefix: "",
    nickname: ""
  }),
  methods: {
    updatePrefix() {
      const prefix = this.prefix.trim();
      if(this.$store.state.loading || !this.guildData.prefix || prefix.length <= 0 || prefix.length > 32) return

      this.$store.state.loading = true;
      sockets.request("updatePrefix", {
        token: this.$cookie.get("token"),
        guildId: this.$route.params.guildId,
        prefix
      }).then((res) => {
        this.guildData.prefix = res.prefix || prefix;
        this.prefix = "";
        this.$store.state.loading = false;
      }).catch(() => {
        this.$store.state.loading = false;
      })
    },
    updateNickname() {
      const nickname = this.nickname.trim();
      if(this.$store.state.loading || !this.guildData.nickname || nickname.length <= 0 || nickname.length > 32) return

      this.$store.state.loading = true;
      sockets.request("updateNickname", {
        token: this.$cookie.get("token"),
        guildId: this.$route.params.guildId,
        nickname
      }).then((res) => {
        this.guildData.nickname = res.nickname || nickname;
        this.nickname = "";
        this.$store.state.loading = false;
      }).catch(() => {
        this.$store.state.loading = false;
      })
    }
  },
  mounted() {
    this.$store.state.loading = true;
    sockets.request("guildDashboard", {
      token: this.$cookie.get("token"),
      guildId: this.$route.params.guildId,
    }).then(guildData => {
      this.guildData = guildData;
      this.$store.state.loading = false;
    }).catch(() => {
      this.$store.state.loading = false;
    })
  },
};
</script>

<style scoped>
@import url("../../../public/css/dashboard.css");
</style>