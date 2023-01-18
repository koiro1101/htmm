import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
const TOKEN = 'TOUTIAO_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(TOKEN, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
