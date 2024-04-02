import request from "@/utils/request";

// 查询字典类型列表
export function getDictTypeList(query: IDictItem) {
  return request({
    url: "/system/dict/type/list",
    method: "get",
    params: query,
  });
}

// 查询字典类型详细
export function getDictType(dictId: React.Key) {
  return request({
    url: "/system/dict/type/" + dictId,
    method: "get",
  });
}

// 新增字典类型
export function addDictType(data: IDictItem) {
  return request({
    url: "/system/dict/type",
    method: "post",
    data: data,
  });
}

// 修改字典类型
export function updateDictType(data: IDictItem) {
  return request({
    url: "/system/dict/type",
    method: "put",
    data: data,
  });
}

// 删除字典类型
export function delDictType(dictId: React.Key) {
  return request({
    url: "/system/dict/type/" + dictId,
    method: "delete",
  });
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: "/system/dict/type/refreshCache",
    method: "delete",
  });
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: "/system/dict/type/optionSelect",
    method: "get",
  });
}

/** 导出字典 */
export function exportDictType() {
  return request({
    url: "/system/dict/type/export",
    method: "post",
    responseType: "blob",
    // data: params
  });
}
