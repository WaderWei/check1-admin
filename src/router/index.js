import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/DownTabBar.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/selectUsers',
      name: 'selectUsers',
      component: () => import('../views/SelectUsers.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('../views/ResetPassword.vue')
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
          component: () => import('../views/Index.vue'),
          children: [
            {
              path: 'checkList',
              name: 'checkList',
              component: () => import('../views/CheckList.vue')
            }
          ]
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
