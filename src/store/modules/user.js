import { loginApi, getUserInfoApi, getUserBaseInfoApi } from "@/api/user";
import { resetRouter } from "@/router";
import { setToken, getToken, removeToken, setTimeStamp } from "@/utils/auth";
const state = {
  token: getToken(), // token
  userInfo: {}, // 用户资料
};
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data;
    setToken(data);
    setTimeStamp(); // 记录登录的时候的时间戳
  },
  // 删除token
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  // 设置用户资料
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // 删除用户资料
  removeUserInfo(state) {
    state.userInfo = {};
  },
};
const actions = {
  // 登录
  async login(context, data) {
    let token = await loginApi(data);
    context.commit("setToken", token);
  },
  // 获取用户资料
  async getUserInfo(context) {
    // 获取用户信息
    let res = await getUserInfoApi();
    let res2 = await getUserBaseInfoApi(res.userId);
    // 获取员工基本信息
    context.commit("setUserInfo", { ...res, ...res2 });
    // 返回！
    return { ...res, ...res2 };
  },
  // 退出
  async quit({ commit }) {
    commit("removeToken");
    commit("removeUserInfo");
    // 退出的时候要重置路由实例对象；并且将 完整的路由映射数组重置为初始值
    // 1. 路由实例重置
    resetRouter();
    // 2. 侧边栏设置初始值(A模块的action里面如何调用B模块的mutation)
    // 默认情况在一个模块的action里面调用的mutation都是自己的模块的
    // 如果传递第三个参数为对象，配置root:true，则表示调用从根模块开始
    commit("permission/setRoutes", [], { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
