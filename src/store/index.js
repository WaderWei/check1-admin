import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    user: sessionStorage.getItem('user') || '',
    isPostSelectUserPage: false,
    selectUserArr: [],
    selectUserArrCheck: [],
    selectUserArrReport: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    setUser (state, user) {
      state.user = user
      sessionStorage.setItem('user', state.user)
    },
    setUserPage (state, bl) {
      state.isPostSelectUserPage = bl
    },
    setSelectUserArr (state, arr) {
      state.selectUserArr = arr
    },
    setSelectUserArrCheck (state, arr) {
      state.selectUserArrCheck = arr
    },
    setSelectUserArrReport (state, arr) {
      state.selectUserArrReport = arr
    }
  },
  actions: {
  },
  modules: {
  }
})
