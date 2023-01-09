import createPersistedState from "vuex-persistedstate"
import { createStore } from 'vuex'

export default createStore({
  state: {
    access_token: ""
  },
  getters: {
  },
  mutations: {
    SET_ACCESS_TOKEN(state, token){
      state.access_token = token
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
