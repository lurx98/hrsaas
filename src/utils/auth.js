// 导入js-cookie模块
import Cookies from 'js-cookie'
// 导入字符串键
const TokenKey = 'hrsass_token'
const LoginTimeKey = 'hrsass_login_time'

// 设置登录的时间戳
export function setTimeStamp(){
  Cookies.set(LoginTimeKey, Date.now())
}

// 读取登录的时间戳
export function getTimeStamp(){
  return Cookies.get(LoginTimeKey)
}

// 读取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
