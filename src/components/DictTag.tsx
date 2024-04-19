import { FC, useEffect, useState } from "react";
import { Tag } from "antd";

type IDictTagProps = {
  value: string;
  options: Record<string, string>[];
};

const colorMap: Record<string, string> = {
  default: "default",
  primary: "processing",
  success: "success",
  danger: "error",
  warning: "warning",
};

const DictTag: FC<IDictTagProps> = ({ options, value }) => {
  const [data, setData] = useState<Record<string, string>>();
  useEffect(() => {
    const data = options?.find((item) => item.value === value);
    setData(data);
  }, [options, value]);
  return (
    <Tag color={colorMap[data?.listClass ?? "default"]}>{data?.label}</Tag>
  );
};

export default DictTag;
