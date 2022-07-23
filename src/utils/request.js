import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
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
    if(token) config.headers.Authorization = `Bearer ${token}`
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
    // 请求错误
    return Promise.reject(error)
  }
)
// 暴露出去
export default service
