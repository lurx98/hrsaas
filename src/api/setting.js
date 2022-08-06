import request from '@/utils/request'
// 获取角色列表
export const getRoleListApi = (params)=>{
    return request({
        url:'/sys/role',
        method:'GET',
        params
    })
}
// 获取角色详情
export const getRoleInfoApi = (id)=>{
    return request({
        url:'/sys/role/'+id,
        method:'GET'
    })
}
// 增加角色详情
export const addRoleApi = (data)=>{
    return request({
        url:'/sys/role',
        method:'post',
        data
    })
}
// 修改角色详情
export const editRoleApi = (data)=>{
    return request({
        url:'/sys/role/'+data.id,
        method:'put',
        data
    })
}
// 删除角色数据
export const delRoleApi = (id)=>{
    return request({
        url:'/sys/role/'+id,
        method:'delete'
    })
}

// 获取企业信息
export const getCompanyInfoApi = id =>{
    return request({
        url:'/company/'+id,
        method:'GET'
    })
}


// 给角色授权
export const assignAuthApi = data=>{
    return request({
        url:'/sys/role/assignPrem',
        method:'put',
        data
    })
}