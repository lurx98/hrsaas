import request from '@/utils/request'
// 获取权限列表
export const getPermissionListApi = (params)=>{
  return request({
      url:'/sys/permission',
      method:'GET',
      params
  })
}
// 获取权限详情
export const getPermissionInfoApi = (id)=>{
  return request({
      url:'/sys/permission/'+id,
      method:'GET'
  })
}
// 增加权限
export const addPermissionApi = (data)=>{
  return request({
      url:'/sys/permission',
      method:'post',
      data
  })
}
// 修改权限
export const editPermissionApi = (data)=>{
  return request({
      url:'/sys/permission/'+data.id,
      method:'put',
      data
  })
}
// 删除
export const delPermissionApi = (id)=>{
  return request({
      url:'/sys/permission/'+id,
      method:'delete',
  })
}
