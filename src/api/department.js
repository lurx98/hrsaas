import request from '@/utils/request'
// 获取部门列表
export const getDepartmentListApi = ()=>{
    return request({
        url:'/company/department',
        method:'GET'
    })
}
// 获取部门详情
export const getDepartmentInfoApi = (id)=>{
    return request({
        url:'/company/department/'+id,
        method:'GET'
    })
}
// 增加部门详情
export const addDepartmentApi = (data)=>{
    return request({
        url:'/company/department',
        method:'post',
        data
    })
}
// 修改部门详情
export const editDepartmentApi = (data)=>{
    return request({
        url:'/company/department/'+data.id,
        method:'put',
        data
    })
}
// 删除部门数据
export const delDepartmentApi = (id)=>{
    return request({
        url:'/company/department/'+id,
        method:'delete'
    })
}