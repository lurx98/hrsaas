import router from "@/router";
import { getToken } from "@/utils/auth";
import NProgress from "nprogress"; // 引入一份进度条插件
import "nprogress/nprogress.css"; // 引入进度条样式
import store from "./store";

// 全局前置守卫
const whiteList = ["/404", "/login"];
router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 开启进度条
  // 是否登录
  if (getToken()) {
    // 登录了
    if (to.path === "/login") {
      /* 登录了还去登录页，就让他去主页 */
      next("/");
    } else {
      /* 登陆了，去的不是登录页，放行 【去的系统里面的界面】*/
      // 判断是否已经有了用户资料 【优点是刷新就重新获取用户资料】
      if (!store.getters.userId) {
        // 没有就发生请求获取一次
        let { roles } = await store.dispatch("user/getUserInfo");
        // roles.menus 该用户对应角色的权限标识
        // 筛选出属于当前用户的动态路由映射
        let routes = await store.dispatch(
          "permission/filterRoutes",
          roles.menus
        );
        // 添加动态路由映射数组
        router.addRoutes([
          ...routes,
          { path: "*", redirect: "/404", hidden: true },
        ]); // 动态添加是一个耗时操作，如果直接next() 会出现路由还没有配置好的情况
        // 再次执行一次， next(地址)  再次进入导航守卫逻辑，next() 会直接进入组件界面
        next(to.path);
      } else {
        next();
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      // 在白名单中
      next();
    } else {
      // 不在白名单中(非法访问)
      next("/login");
    }
  }
  NProgress.done(); // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
});

// 全局后置守卫
router.afterEach(() => {
  NProgress.done();
});
