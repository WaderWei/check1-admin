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
      path: '/createCheckTb',
      name: 'createCheckTb',
      component: () => import('../views/newadd/CreateCheckTb.vue')
    },
    {
      path: '/createCheckItem',
      name: 'createCheckItem',
      component: () => import('../views/newadd/CreateCheckItem.vue')
    },
    {
      path: '/checkItemList',
      name: 'checkItemList',
      component: () => import('../views/List/CheckItemList.vue')
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
              path: 'createList',
              name: 'createList',
              component: () => import('../views/List/CreateList.vue')
            },
            {
              path: 'exeList',
              name: 'exeList',
              component: () => import('../views/List/ExeList.vue')
            },
            {
              path: 'checkList',
              name: 'checkList',
              component: () => import('../views/List/CheckList.vue')
            },
            {
              path: 'postReportList',
              name: 'postReportList',
              component: () => import('../views/List/PostReportList.vue')
            },
            {
              path: 'receiveReportList',
              name: 'receiveReportList',
              component: () => import('../views/List/ReceiveReportList.vue')
            }
          ]
        },
        {
          path: 'initSelection',
          name: 'initSelection',
          component: () => import('../views/InitSelection.vue')
        }
      ]
    },
    {
      path: '/FZF',
      name: 'FZF',
      component: () => import('../views/FZF.vue')
    }
  ]
})
