import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    user: sessionStorage.getItem('user') || ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    setUser (state, user) {
      state.user = user
      sessionStorage.setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
