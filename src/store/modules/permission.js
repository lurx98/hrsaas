/* 权限控制模块 */
import { constantRoutes, asyncRoutes } from "@/router";
export default {
  namespaced: true,
  state() {
    return {
      // 所有的路由映射（开始只有静态路由）
      routes: constantRoutes, // 所有人默认拥有静态路由
    };
  },
  getters: {},
  mutations: {
    // 添加动态路由给所有路由
    setRoutes(state, newRoutes) {
      // 静态路由 + 动态的路由
      state.routes = [...constantRoutes, ...newRoutes];
    },
  },
  actions: {
    filterRoutes(context, data) {
      //  data 就是服务器返回的该用户的角色对应的权限标识
      // 遍历所有的动态路由映射，判断它的name是不是在权限标识数组中，如果在说明属于该用户的动态路由映射
      const userRoutes = [];
      asyncRoutes.forEach((item) => {
        if (data.includes(item.name)) userRoutes.push(item);
      });
      context.commit("setRoutes", userRoutes);
      // 返回整理好的动态路由
      return userRoutes;
    },
  },
};
