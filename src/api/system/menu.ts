import request from "@/utils/request";

// 查询菜单列表
export function getMenuList(query: { menuName?: string; status?: string }) {
  return request({
    url: "/system/menu/list",
    method: "get",
    params: query,
  });
}

// 根据角色ID查询菜单下拉树结构
export function getRoleMenuTreeSelect(roleId: React.Key) {
  return request({
    url: "/system/menu/roleMenuTreeSelect/" + roleId,
    method: "get",
  });
}

// 查询菜单下拉树结构
export function getTreeSelect() {
  return request({
    url: "/system/menu/treeSelect",
    method: "get",
  });
}

// 查询菜单详细
export function getMenu(menuId: React.Key) {
  return request({
    url: "/system/menu/" + menuId,
    method: "get",
  });
}

// 新增菜单
export function addMenu(data: IMenuItem) {
  return request({
    url: "/system/menu",
    method: "post",
    data: data,
  });
}

// 修改菜单
export function updateMenu(data: IMenuItem) {
  return request({
    url: "/system/menu",
    method: "put",
    data: data,
  });
}

// 删除菜单
export function delMenu(menuId: React.Key) {
  return request({
    url: "/system/menu/" + menuId,
    method: "delete",
  });
}
