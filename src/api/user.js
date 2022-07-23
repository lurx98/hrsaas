import request from '@/utils/request'
// export function login(data) {
//     return request({
//         url:'/login'   
//         // 完整请求地址  /api/login
//         // http://localhost:8888/api/login
//         // http://ihrm.itheima.net/login
//     })
// }
export const loginApi = data=>{
    return request({
        url:'/sys/login',
        method:'post',
        data
    })
}

export function getUserInfoApi() {
    return request({
        url:'/sys/profile',
        method:'post',
    })
}

export function logout() {

}
