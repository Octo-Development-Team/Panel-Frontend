<template>
  <div class="uk-width-1-4@l uk-text-center">
    <div
      class="uk-card uk-card-default uk-card-small uk-card-hover uk-border-rounded"
      :style="!module.implemented ? 'background-color: #542225;' : ''"
    >
      <div class="uk-card-header">
        <div class="uk-grid uk-grid-small">
          <div class="uk-width-expand">
            <h4>{{ module.displayName }}</h4>
          </div>
        </div>
      </div>
      <div class="uk-card-body">
        <div class="uk-align-center">
          <button class="uk-button uk-border-rounded" :class="module.enabled ? 'uk-button-primary' : 'uk-button-danger'" @click.prevent="toggleModule(module.keyword)" :disabled="changing">Toggle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sockets from '../util/sockets';

export default {
  name: "GuildModuleCard",
  props: {
    module: {
      default: {},
    },
  },
  data: () => ({
      checked: false,
      changing: false
  }),
  methods: {
      toggleModule(moduleKeyword) {
          this.changing = true;
            sockets.request("toggleModule", {
                token: this.$cookie.get("token"),
                guildId: this.$route.params.guildId,
                module: moduleKeyword
            }).then(res => {
                this.module.enabled = res.state;
                this.changing = false;
            }).catch(() => {
                this.changing = false;
            })
      }
  },
  mounted() {
      this.checked = this.module.enabled
  }
};
</script>
