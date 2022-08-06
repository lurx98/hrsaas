import request from '@/utils/request'

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimpleApi() {
  return request({
    url: '/sys/user/simple'
  })
}


// 获取员工列表
export const getUserListApi = (params)=>{
  return request({
      url:'/sys/user',
      method:'GET',
      params
  })
}
// 获取员工详情
export const getUserInfoApi = (id)=>{
  return request({
      url:'/sys/user/'+id,
      method:'GET'
  })
}
// 增加员工
export const addUserApi = (data)=>{
  return request({
      url:'/sys/user',
      method:'post',
      data
  })
}
// 修改员工
export const editUserApi = (data)=>{
  return request({
      url:'/sys/user/'+data.id,
      method:'put',
      data
  })
}

// 删除
export const delUserApi = (id)=>{
  return request({
      url:'/sys/user/'+id,
      method:'delete',
  })
}

// 批量导入员工数据
export const batchUserApi = (data)=>{
  return request({
      url:'/sys/user/batch',
      method:'post',
      data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}


/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 封装用户关联角色
export const  assignRoleApi = data=>{
  return request({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data
  }) 
}