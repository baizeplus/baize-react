import { useRequest } from "ahooks";
import { getDicts } from "@/api/system/dict/data";
export default function useDict(dictType: string[]) {
  const { data = [] } = useRequest(
    () => Promise.all(dictType.map(async (type) => getDicts(type))),
    {
      cacheKey: dictType.join(","),
      staleTime: 3600000,
      manual: false,
    },
  );

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
