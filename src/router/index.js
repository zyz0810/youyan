import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '??????',
  //       meta: { title: '??????', icon: 'indexIcon', affix: true }
  //     }
  //   ]
  // }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/testing/monitor',
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'iconfont icon-jiance',
      roles: ['admin'],
    },
    children: [
      {
        path: 'testing/monitor',
        component: () => import('@/views/testing/monitor/list'),
        name: 'modelList',
        meta: {
          title: '????????????',
          roles: ['admin'],
        }
      },
      {
        path: 'testing/overview',
        component: () => import('@/views/testing/overview/list'),
        name: '????????????',
        meta: {
          title: '????????????',
          roles: ['admin']
        }
      },
    ]
  },
  {
    path: '/workOrder',
    component: Layout,
    redirect: '/workOrder/police',
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'iconfont icon-gongdan',
      roles: [
        'admin',
      ]
    },
    children: [
      {
        path: 'police',
        component: () => import('@/views/workOrder/police/list'),
        name: '????????????',
        meta: {
          title: '????????????',
          roles: [
            'admin',
          ]
        }
      },
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: 'noRedirect',
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'iconfont icon-baobiao-copy',
      roles: [
        'admin',
      ]
    },
    children: [
      {
        path: 'intelligence',
        component: () => import('@/views/statistics/intelligence/list'),
        name: 'intelligenceList',
        meta: {
          title: '????????????',
          roles: [
            'admin',
          ]
        }
      },
      {
        path: 'data',
        component: () => import('@/views/statistics/data/list'),
        name: 'dataList',
        meta: {
          title: '????????????',
          roles: [
            'admin',
          ]
        }
      },
    ]
  },
  // {
  //   path: '/devOps',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: '????????????',
  //   meta: {
  //     title: '????????????',
  //     icon: 'iconfont icon-jilu',
  //     roles: [
  //       'admin',
  //     ]
  //   },
  //   children: [
  //     {
  //       path: 'verify',
  //       component: () => import('@/views/devOps/verify/list'),
  //       name: 'verifyList',
  //       meta: {
  //         title: '????????????',
  //         roles: [
  //           'admin',
  //         ]
  //       }
  //     },
  //     {
  //       path: 'repair',
  //       component: () => import('@/views/devOps/repair/list'),
  //       name: 'repairList',
  //       meta: {
  //         title: '????????????',
  //         roles: [
  //           'admin',
  //         ]
  //       }
  //     },
  //   ]
  // },
  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: '????????????',
    meta: {
      title: '????????????',
      icon: 'iconfont icon-guanli4',
      roles: [
        'admin',
      ]
    },
    children: [
      {
        path: 'catering',
        component: () => import('@/views/system/catering/list'),
        name: 'cateringList',
        meta: {
          title: '????????????',
          roles: [
            'admin',
          ]
        }
      },
      {
        path: 'monitor',
        component: () => import('@/views/system/monitor/list'),
        name: 'monitorList',
        meta: {
          title: '????????????',
          roles: ['admin',]
        }
      },
      // {
      //   path: 'jurisdiction',
      //   component: () => import('@/views/system/jurisdiction/list'),
      //   name: 'jurisdictionList',
      //   meta: { title: '????????????', roles: ['admin', 'menu:list'] }
      // },
      // {
      //   path: 'user',
      //   component: () => import('@/views/system/user/list'),
      //   name: 'userList',
      //   meta: {
      //     title: '????????????',
      //     roles: [
      //       'admin',
      //     ]
      //   }
      // },
      // {
      //   path: 'threshold',
      //   component: () => import('@/views/system/threshold/list'),
      //   name: 'thresholdList',
      //   meta: {
      //     title: '????????????',
      //     roles: [
      //       'admin',
      //     ]
      //   }
      // },
      // {
      //   path: 'dictionary',
      //   component: () => import('@/views/system/dictionary/list'),
      //   name: 'dictionaryList',
      //   meta: {
      //     title: '????????????',
      //     roles: [
      //       'admin',
      //     ]
      //   }
      // }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
