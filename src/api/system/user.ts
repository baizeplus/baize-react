import request from "@/utils/request";

// 查询用户列表
export function getUserList(query: IUserSearchParams) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}

// 用户状态修改
export function changeUserStatus(data: { userId: string; status: string; }) {
  
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户详细
export function getUser(userId: IUserItem['userId']) {
  return request({
    url: '/system/user/' + userId,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId: string) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(userId: string, password: string) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 导出用户
export function exportUser() {
  return request({
    url: '/system/user/export',
    method: 'post',
    responseType: 'blob',
    // data: params
  })
}