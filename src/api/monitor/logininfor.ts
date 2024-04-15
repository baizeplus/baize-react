import request from "@/utils/request";

// 查询登录日志列表
export function getLogininforList(query: Record<string, string>) {
  return request({
    url: "/monitor/logininfor/list",
    method: "get",
    params: query,
  });
}

// 删除登录日志
export function delLogininfor(infoId: React.Key) {
  return request({
    url: "/monitor/logininfor/" + infoId,
    method: "delete",
  });
}

// 解锁用户登录状态
export function unlockLogininfor(userName: string) {
  return request({
    url: "/monitor/logininfor/unlock/" + userName,
    method: "get",
  });
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: "/monitor/logininfor/clean",
    method: "delete",
  });
}

/** 导出登陆日志 */
export function exportLogininfor() {
  return request({
    url: "/monitor/logininfor/export",
    method: "post",
    responseType: "blob",
    // data: params
  });
}
