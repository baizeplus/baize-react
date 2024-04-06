import request from "@/utils/request";

// 查询定时任务调度列表
export function getJobList(query: IJobItem) {
  return request({
    url: "/monitor/job/list",
    method: "get",
    params: query,
  });
}

// 查询定时任务调度详细
export function getJob(jobId: string) {
  return request({
    url: "/monitor/job/" + jobId,
    method: "get",
  });
}

// 新增定时任务调度
export function addJob(data: IJobItem) {
  return request({
    url: "/monitor/job",
    method: "post",
    data: data,
  });
}

// 修改定时任务调度
export function updateJob(data: IJobItem) {
  return request({
    url: "/monitor/job",
    method: "put",
    data: data,
  });
}

// 删除定时任务调度
export function delJob(jobId: React.Key) {
  return request({
    url: "/monitor/job/" + jobId,
    method: "delete",
  });
}

// 任务状态修改
export function changeJobStatus(jobId: string, status: string) {
  const data = {
    jobId,
    status,
  };
  return request({
    url: "/monitor/job/changeStatus",
    method: "put",
    data: data,
  });
}

// 定时任务立即执行一次
export function runJob(jobId: string, jobGroup: string) {
  const data = {
    jobId,
    jobGroup,
  };
  return request({
    url: "/monitor/job/run",
    method: "put",
    data: data,
  });
}
