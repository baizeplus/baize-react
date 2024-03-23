import request from "@/utils/request";

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: "/system/user/profile",
    method: "get",
  });
}

// 修改用户个人信息
export function updateUserProfile(data: IUpdateUserBaseInfo) {
  return request({
    url: "/system/user/profile",
    method: "put",
    data: data,
  });
}

// 用户密码重置
export function updateUserPwd(data: {
  oldPassword: string;
  newPassword: string;
}) {
  return request({
    url: "/system/user/profile/updatePwd",
    method: "put",
    params: data,
  });
}

// 查询授权角色
export function getAuthRole(userId: string) {
  return request({
    url: "/system/user/authRole/" + userId,
    method: "get",
  });
}

// 保存授权角色
export function updateAuthRole(data: { userId: string; roleIds: string }) {
  return request({
    url: "/system/user/authRole",
    method: "put",
    params: data,
  });
}
