import request from "@/utils/request";

// 查询操作日志列表
export function getOperlogList(query: Record<string, string>) {
  return request({
    url: "/monitor/operlog/list",
    method: "get",
    params: query,
  });
}

// 删除操作日志
export function delOperlog(operId: React.Key) {
  return request({
    url: "/monitor/operlog/" + operId,
    method: "delete",
  });
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: "/monitor/operlog/clean",
    method: "delete",
  });
}

/** 导出操作日志 */
export function exportOperlog() {
  return request({
    url: "/monitor/operlog/export",
    method: "post",
    responseType: "blob",
    // data: params
  });
}
