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
  //       name: '首页',
  //       meta: { title: '首页', icon: 'indexIcon', affix: true }
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
    name: '在线监测',
    meta: {
      title: '在线监测',
      icon: 'iconfont icon-jiance',
      roles: ['admin'],
    },
    children: [
      {
        path: 'testing/monitor',
        component: () => import('@/views/testing/monitor/list'),
        name: 'modelList',
        meta: {
          title: '实时监控',
          roles: ['admin'],
        }
      },
      {
        path: 'testing/overview',
        component: () => import('@/views/testing/overview/list'),
        name: '综合概览',
        meta: {
          title: '综合概览',
          roles: ['admin']
        }
      },
    ]
  },
  {
    path: '/workOrder',
    component: Layout,
    redirect: '/workOrder/police',
    name: '工单处理',
    meta: {
      title: '工单处理',
      icon: 'iconfont icon-gongdan',
      roles: [
        'admin',
      ]
    },
    children: [
      {
        path: 'police',
        component: () => import('@/views/workOrder/police/list'),
        name: '报警列表',
        meta: {
          title: '报警列表',
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
    name: '统计报表',
    meta: {
      title: '统计报表',
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
          title: '智能分析',
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
          title: '数据统计',
          roles: [
            'admin',
          ]
        }
      },
    ]
  },
  {
    path: '/devOps',
    component: Layout,
    redirect: 'noRedirect',
    name: '运维记录',
    meta: {
      title: '运维记录',
      icon: 'iconfont icon-jilu',
      roles: [
        'admin',
      ]
    },
    children: [
      {
        path: 'verify',
        component: () => import('@/views/devOps/verify/list'),
        name: 'verifyList',
        meta: {
          title: '故障核实',
          roles: [
            'admin',
          ]
        }
      },
      {
        path: 'repair',
        component: () => import('@/views/devOps/repair/list'),
        name: 'repairList',
        meta: {
          title: '故障维修',
          roles: [
            'admin',
          ]
        }
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: '系统管理',
    meta: {
      title: '系统管理',
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
          title: '餐企档案',
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
          title: '监控设备',
          roles: ['admin',]
        }
      },
      {
        path: 'jurisdiction',
        component: () => import('@/views/system/jurisdiction/list'),
        name: 'jurisdictionList',
        meta: { title: '辖区管理', roles: ['admin', 'menu:list'] }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/list'),
        name: 'userList',
        meta: {
          title: '用户管理',
          roles: [
            'admin',
          ]
        }
      },
      {
        path: 'threshold',
        component: () => import('@/views/system/threshold/list'),
        name: 'thresholdList',
        meta: {
          title: '阈值设置',
          roles: [
            'admin',
          ]
        }
      },
      {
        path: 'dictionary',
        component: () => import('@/views/system/dictionary/list'),
        name: 'dictionaryList',
        meta: {
          title: '数据字典',
          roles: [
            'admin',
          ]
        }
      }
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
