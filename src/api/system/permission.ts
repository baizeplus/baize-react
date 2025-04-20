import request from "@/utils/request";

// 查询菜单列表
export function getPermissionList(query: {
  permissionName?: string;
  status?: string;
}) {
  return request({
    url: "/system/permission/list",
    method: "get",
    params: query,
  });
}

// 根据角色ID查询权限下拉树结构
export function getRolePermissionTreeSelect(roleId: React.Key) {
  return request({
    url: "/system/permission/rolePermissionTreeSelect/" + roleId,
    method: "get",
  });
}

// 查询权限详细
export function getPermission(permissionId: React.Key) {
  return request({
    url: "/system/permission/" + permissionId,
    method: "get",
  });
}

// 新增权限
export function addPermission(data: IPermissionItem) {
  return request({
    url: "/system/permission",
    method: "post",
    data: data,
  });
}

// 修改权限
export function updatePermission(data: IPermissionItem) {
  return request({
    url: "/system/permission",
    method: "put",
    data: data,
  });
}

// 删除权限
export function delPermission(permissionId: React.Key) {
  return request({
    url: "/system/permission/" + permissionId,
    method: "delete",
  });
}
