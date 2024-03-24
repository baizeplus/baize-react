import request from "@/utils/request";

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
