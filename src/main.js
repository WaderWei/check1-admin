import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'mand-mobile/components/_style/global.styl'
import 'normalize.css'
import axios from 'axios'
import setAxios from './axios/axiosconfig'

Vue.prototype.$http = axios
setAxios()

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  if (sessionStorage.getItem('user')) {
    if (to.matched.length === 0) {
      console.log(to)
      console.log(from)
      next({
        path: '/FZF',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
