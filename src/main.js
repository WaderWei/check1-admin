import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'mand-mobile/components/_style/global.styl'
import 'normalize.css'
import axios from 'axios'
import setAxios from './axios/axiosconfig'
import vuePicturePreview from 'vue-picture-preview'
import qs from 'qs'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable'
import echarts from 'echarts'
import uploader from 'vue-simple-uploader'
Vue.use(uploader)
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
setAxios()

Vue.use(vuePicturePreview)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'ad') {
    next()
    return
  }
  if (sessionStorage.getItem('user')) {
    if (to.matched.length === 0) {
      next({
        path: '/FZF',
        query: { redirect: to.fullPath }
      })
    } else {
      if (to.name === 'postReportList') {
        sessionStorage.setItem('reportListFlag', to.query.checkId ? to.query.checkId : -1)
        sessionStorage.setItem('reportNameFlag', to.query.checkName)
      } else {
        sessionStorage.setItem('reportListFlag', -1)
        sessionStorage.setItem('reportNameFlag', -1)
      }
      next()
    }
  } else {
    next({
      path: '/ad',
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
