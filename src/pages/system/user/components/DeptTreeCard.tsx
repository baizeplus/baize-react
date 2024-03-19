import { FC, useState } from "react";
import { Card, Input } from "antd";
import DeptTree from "./DeptTree";
import { SearchOutlined } from "@ant-design/icons";

type IProps = {
  onSearch?: (deptId: string) => void;
};

const DeptTreeCard: FC<IProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  return (
    <Card className="w-full shadow-sm !mb-2" classNames={{ body: "!p-4" }}>
      <Input
        placeholder="请输入部门名称"
        prefix={<SearchOutlined className="text-gray-400" />}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DeptTree search={search} onSearch={onSearch} />
    </Card>
  );
};

export default DeptTreeCard;
