import request from "@/utils/request";

// 查询在线用户列表
export function getOnList(query: { ipaddr?: string; userName?: string }) {
  return request({
    url: "/monitor/online/list",
    method: "get",
    params: query,
  });
}

// 强退用户
export function forceLogout(tokenId: string) {
  return request({
    url: "/monitor/online/" + tokenId,
    method: "delete",
  });
}
