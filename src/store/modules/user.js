import { loginApi,getUserInfoApi } from '@/api/user'
import { 
  setToken,
  getToken,
  removeToken
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
  async login(context,data){
    let token = await loginApi(data)
    context.commit('setToken',token)
  },
  async getUserInfo(context){
    let res = await getUserInfoApi()
    context.commit('setUserInfo',res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
