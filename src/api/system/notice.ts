import request from "@/utils/request";

// 查询公告列表
export function getNoticeList(query: INoticeItem) {
  return request({
    url: "/system/notice/list",
    method: "get",
    params: query,
  });
}

// 查询公告详细
export function getNotice(noticeId: React.Key) {
  return request({
    url: "/system/notice/" + noticeId,
    method: "get",
  });
}

// 新增公告
export function addNotice(data: INoticeItem) {
  return request({
    url: "/system/notice",
    method: "post",
    data: data,
  });
}

// 修改公告
export function updateNotice(data: INoticeItem) {
  return request({
    url: "/system/notice",
    method: "put",
    data: data,
  });
}

// 删除公告
export function delNotice(noticeId: React.Key) {
  return request({
    url: "/system/notice/" + noticeId,
    method: "delete",
  });
}

export function postUploadFile(data: FormData) {
  return request({
    url: "file/uploadFileRandomName",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data,
  });
}
