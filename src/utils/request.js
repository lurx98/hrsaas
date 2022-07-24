import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const timeLen = 2*1000*60*60  // 2h
// const timeLen = 2*1000*4  // 10s
const checkTimeOut = ()=>{
  // 判断是否登录失效了
  let nowTime = Date.now()  //发生请求的时间
  let loginTime = getTimeStamp() // 登录时候的时间戳
  // 说明过期了
  return (nowTime - loginTime) >= timeLen
}
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  // baseURL: '/api', // 基准地址
  // withCredentials: true, // 是否携带token
  timeout: 5000 // 请求时长
})
// 请求拦截器 【携带token】
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if(token){
      if(checkTimeOut()){
        Message.error('登录过期了,请重新登录')
        store.dispatch('user/quit')
        router.push('/login')
        return Promise.reject('token过期,登录失效')
      }
      // 携带token
      config.headers.Authorization = `Bearer ${token}`
    }
    // 一定要有return config
    return config
  },
  error => Promise.reject(error)
)
// 响应拦截器 【解构数据、集中的错误处理，如token过期】
service.interceptors.response.use(
  response => {
    // 一定要return response
    const { success,data,message } = response.data
    if(success){
      // 业务正确，返回数据
      return data
    }else{
      // 业务错误，提示消息
      Message.error(message)
      return  Promise.reject(new Error(message))
    }
  },
  error => {
    // 请求错误 【token过期被动处理：服务器端返回了什么，我们根据他的返回来处理过期问题】
    console.dir(error);
    if(error.response && error.response.status === 401 && error.response.data.code === 10002){
      // token过期了
      // 1. 提示框
      Message.error('登录过期了,请重新登录')
      // 2. 清除仓库的token和userInfo
      store.dispatch('user/quit')
      // 3. 跳转界面
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
// 暴露出去
export default service
