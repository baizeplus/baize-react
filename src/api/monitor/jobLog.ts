import request from "@/utils/request";

// 查询调度日志列表
export function getJobLogList(query: IJobLogItem) {
  return request({
    url: "/monitor/jobLog/list",
    method: "get",
    params: query,
  });
}

// 删除调度日志
export function delJobLog(jobLogId: string) {
  return request({
    url: "/monitor/jobLog/" + jobLogId,
    method: "delete",
  });
}

// 清空调度日志
export function cleanJobLog() {
  return request({
    url: "/monitor/jobLog/clean",
    method: "delete",
  });
}

/** 导出操作日志 */
export function exportJobLog() {
  return request({
    url: "/monitor/jobLog/export",
    method: "post",
    responseType: "blob",
    // data: params
  });
}
