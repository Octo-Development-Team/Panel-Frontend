import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    socket: null,
    guildSelection: [],
    alert: {
      display: false,
      type: "",
      message: ""
    }
  },
  mutations: {
    pushAlert(state, alertOptions) {
      if(!alertOptions.message) alertOptions.message = ""
      if(!alertOptions.type) alertOptions.type = "info"
      alertOptions.display = true

      this.state.alert = alertOptions;
      setTimeout(() => {
        this.state.alert.display = false;
      }, 2000)
    }
  },
  actions: {
  },
  modules: {
  }
})
