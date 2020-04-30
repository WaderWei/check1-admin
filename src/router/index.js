import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ad',
      component: () => import('../views/AD.vue')
    },
    {
      path: '/ad',
      name: 'ad',
      component: () => import('../views/AD.vue')
    },
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
      path: '/sentSelectUsers',
      name: 'sentSelectUsers',
      component: () => import('../views/SentSelectUsers.vue')
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
      /* children: [
        {
          path: 'createCheckItem',
          name: 'createCheckItem',
          component: () => import('../views/newadd/CreateCheckItem.vue')
        }
      ] */
    },
    {
      path: '/lookOver',
      name: 'lookOver',
      component: () => import('../views/List/LookOver.vue')
    },
    {
      path: '/readLookOver',
      name: 'readLookOver',
      component: () => import('../views/List/ReadLookOver.vue')
    },
    {
      path: '/reportLookOver',
      name: 'reportLookOver',
      component: () => import('../views/List/ReportLookOver.vue')
    },
    {
      path: '/readReportLookOver',
      name: 'readReportLookOver',
      component: () => import('../views/List/ReadReportLookOver.vue')
    },
    {
      path: '/createReport',
      name: 'createReport',
      component: () => import('../views/newadd/CreateReport.vue')
    },
    {
      path: '/jianCount',
      name: 'jianCount',
      component: () => import('../views/count/JianCount.vue')
    },
    {
      path: '/jianCheckCount',
      name: 'jianCheckCount',
      component: () => import('../views/count/JianCheckCount.vue')
    },
    {
      path: '/jianReportCount',
      name: 'jianReportCount',
      component: () => import('../views/count/JianReportCount.vue')
    },
    {
      path: '/searchCheckList',
      name: 'searchCheckList',
      component: () => import('../views/search/CheckList.vue')
    },
    {
      path: '/readCheckList',
      name: 'readCheckList',
      component: () => import('../views/search/ReadCheckList.vue')
    },
    {
      path: '/readReportList',
      name: 'readReportList',
      component: () => import('../views/search/ReadReportList.vue')
    },
    {
      path: '/completeReport',
      name: 'completeReport',
      component: () => import('../views/search/CompleteReport.vue')
    },
    {
      path: '/unCompleteReport',
      name: 'unCompleteReport',
      component: () => import('../views/search/UnCompleteReport.vue')
    },
    {
      path: '/unComUnDealReport',
      name: 'unComUnDealReport',
      component: () => import('../views/search/UnComUnDealReport.vue')
    },
    {
      path: '/searchReportLookOver',
      name: 'searchReportLookOver',
      component: () => import('../views/search/SearchReportLookOver.vue')
    },
    {
      path: '/organizationView',
      name: 'organizationView',
      component: () => import('../views/manager/OrganizationView.vue')
    },
    {
      path: '/downTabBar',
      name: 'downTabBar',
      component: () => import('../views/DownTabBar.vue'),
      /* 嵌套路由即子路径不用加 /  */
      children: [
        {
          path: 'adminIndex',
          name: 'adminIndex',
          component: () => import('../views/AdminIndex.vue'),
          children: [
            {
              path: 'initSelection',
              name: 'initSelection',
              component: () => import('../views/InitSelection.vue')
            },
            {
              path: 'superManSelection',
              name: 'superManSelection',
              component: () => import('../views/superManSelection.vue')
            },
            {
              path: 'deptMana',
              name: 'deptMana',
              component: () => import('../views/manager/DeptMana.vue')
            },
            {
              path: 'postMana',
              name: 'postMana',
              component: () => import('../views/manager/PostMana.vue')
            },
            {
              path: 'staffRelationMana',
              name: 'staffRelationMana',
              component: () => import('../views/manager/StaffRelationMana.vue'),
              children: [
                {
                  path: 'postSelectUser',
                  name: 'postSelectUser',
                  component: () => import('../views/postSelectUser.vue')
                }
              ]
            }
          ]
        },
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
            },
            {
              path: 'jianCheckList',
              name: 'jianCheckList',
              component: () => import('../views/List/JianCheckList.vue')
            },
            {
              path: 'jianReport',
              name: 'jianReport',
              component: () => import('../views/List/JianReport.vue')
            },
            {
              path: 'exeReportList',
              name: 'exeReportList',
              component: () => import('../views/List/ExeReportList.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/FZF',
      name: 'FZF',
      component: () => import('../views/FZF.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test.vue')
    },
    {
      path: '/selectDept',
      name: 'selectDept',
      component: () => import('../views/SelectDept.vue')
    }, {
      path: '/selectDate',
      name: 'selectDate',
      component: () => import('../views/SelectDate.vue')
    },
    {
      path: '/compareReport',
      name: 'compareReport',
      component: () => import('../views/CompareReport.vue')
    }
  ]
})
