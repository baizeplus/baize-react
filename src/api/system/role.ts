import request from "@/utils/request";

// 查询角色列表
export function getRoleList(query: IRoleQueryParams) {
  return request({
    url: "/system/role/list",
    method: "get",
    params: query,
  });
}

// 查询角色详细
export function getRole(roleId: React.Key) {
  return request({
    url: "/system/role/" + roleId,
    method: "get",
  });
}

// 新增角色
export function addRole(data: IEditRoleParams) {
  return request({
    url: "/system/role",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateRole(data: IEditRoleParams) {
  return request({
    url: "/system/role",
    method: "put",
    data: data,
  });
}

// 删除角色
export function delRole(roleId: string) {
  return request({
    url: "/system/role/" + roleId,
    method: "delete",
  });
}

// 角色状态修改
export function changeRoleStatus(data: Record<string, string>) {
  return request({
    url: "/system/role/changeStatus",
    method: "put",
    data: data,
  });
}

/** 导出角色 */
export function exportRole() {
  return request({
    url: "/system/role/export",
    method: "post",
    responseType: "blob",
    // data: params
  });
}
