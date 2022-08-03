import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 引入多个模块的规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionsRouter from './modules/permissions'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingsRouter from './modules/settings'
import socialsRouter from './modules/socials'

// 动态路由
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionsRouter,
  attendancesRouter,
  salarysRouter,
  settingsRouter,
  socialsRouter
]

/* Layout */
// 导入布局组件
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为TRUE，则不显示在系统侧边栏菜单  【重要】
 * alwaysShow: true               如果设置为TRUE，则会一直显示在菜单一级
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           重定向地址  【重要】
 * name:'router-name'             路由的名称  【重要】
 * meta : {
    roles: ['admin','editor']    角色控制信息
    title: 'title'               菜单的文字  【重要】
    icon: 'svg-name'/'el-icon-x' 菜单的图标  【重要】
    breadcrumb: false            如果设置为false，则不会显示在面包屑导航中
    activeMenu: '/example/list'  如果设置，则菜单将一直会有高亮
  }
 */

/**
 * 静态路由
 * 一些基础的页面你不需要权限就可以访问的
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [{
      path: '', // 二级路由path什么都不写 表示二级默认路由
      component: () => import('@/views/import')
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 创建一个路由实例，并返回
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes,...asyncRoutes]
})
// 获取到路由实例
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置一个路由实例
export function resetRouter() {
  // 创建一个新的路由实例
  const newRouter = createRouter()
  // 将路由实例的matcher变成新的即可
  router.matcher = newRouter.matcher // reset router
}

export default router
