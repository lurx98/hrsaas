import request from '@/utils/request'
// export function login(data) {
//     return request({
//         url:'/login'   
//         // 完整请求地址  /api/login
//         // http://localhost:8888/api/login
//         // http://ihrm.itheima.net/login
//     })
// }

// 登录
export const loginApi = data=>{
    return request({
        url:'/sys/login',
        method:'post',
        data
    })
}
// 获取用户资料
export function getUserInfoApi() {
    return request({
        url:'/sys/profile',
        method:'post',
    })
}
// 获取员工基本信息
export function getUserBaseInfoApi(id) {
    return request({
        url:'/sys/user/'+id
    })
}
