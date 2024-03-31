import request from "@/utils/request";

// 查询字典数据列表
export function getDictDataList(query: IDictItem) {
  return request({
    url: "/system/dict/data/list",
    method: "get",
    params: query,
  });
}

// 查询字典数据详细
export function getData(dictCode: string) {
  return request({
    url: "/system/dict/data/" + dictCode,
    method: "get",
  });
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType: string) {
  return request({
    url: "/system/dict/data/type/" + dictType,
    method: "get",
  });
}

// 新增字典数据
export function addData(data: IDictItem) {
  return request({
    url: "/system/dict/data",
    method: "post",
    data: data,
  });
}

// 修改字典数据
export function updateData(data: IDictItem) {
  return request({
    url: "/system/dict/data",
    method: "put",
    data: data,
  });
}

// 删除字典数据
export function delDictData(dictCode: string) {
  return request({
    url: "/system/dict/data/" + dictCode,
    method: "delete",
  });
}
