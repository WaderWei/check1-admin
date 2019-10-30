import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/downTabBar',
      name: 'downTabBar',
      component: () => import('../views/DownTabBar.vue'),
      /* 嵌套路由即子路径不用加 /  */
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'index',
          name: 'index',
          component: () => import('../views/Index.vue')
        },
        {
          path: 'initSelection',
          name: 'initSelection',
          component: () => import('../views/InitSelection.vue')
        }
      ]
    }
  ]
})
