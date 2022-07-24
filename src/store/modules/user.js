import { loginApi,getUserInfoApi,getUserBaseInfoApi } from '@/api/user'
import { 
  setToken,
  getToken,
  removeToken,
  setTimeStamp
} from '@/utils/auth'
const state = {
  token:getToken(), // token
  userInfo:{} // 用户资料
}
const mutations = {
  // 设置token
  setToken(state,data){
    state.token = data
    setToken(data)
    setTimeStamp()  // 记录登录的时候的时间戳
  },
  // 删除token
  removeToken(state){
    state.token = null
    removeToken()
  },
  // 设置用户资料
  setUserInfo(state,data){
    state.userInfo = data
  },
  // 删除用户资料
  removeUserInfo(state){
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login(context,data){
    let token = await loginApi(data)
    context.commit('setToken',token)
  },
  // 获取用户资料
  async getUserInfo(context){
    // 获取用户信息
    let res = await getUserInfoApi()
    let res2 = await getUserBaseInfoApi(res.userId)
    // 获取员工基本信息
    context.commit('setUserInfo',{...res,...res2})
  },
  // 退出
  async quit({commit}){
    commit('removeToken')
    commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
