import { useRequest } from "ahooks";
// import useDictStore from "@/store/dict";
import { getDicts } from "@/api/system/dict/data";
// import { useCallback, useEffect, useState } from "react";

export default function useDict(dictType: string[]) {
  // const { dictObj, dispatch } = useDictStore((state) => ({ dictObj: state.dictObj, dispatch: state.dispatch }));
  const requestList = dictType.map((type) => getDicts(type));

  const { data = [] } = useRequest(() => Promise.all(requestList), {
    throttleWait: 300,
    // manual: true
  });

  const handleConvert = (data: IDictItem[]) => {
    if (!data) {
      return [];
    }
    return data.map((item) => ({
      label: item.dictLabel,
      value: item.dictValue,
      elTagType: item.listClass,
      elTagClass: item.cssClass,
    }));
  };

  return data?.map((item) => handleConvert(item?.data));
}
