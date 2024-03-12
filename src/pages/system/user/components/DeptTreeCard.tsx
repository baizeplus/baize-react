import { FC, useState } from "react";
import { Card, Input } from "antd";
import DeptTree from "./DeptTree";
import { SearchOutlined } from "@ant-design/icons";

const DeptTreeCard: FC = () => {
  const [search, setSearch] = useState("");

  return (
    <Card className="w-full shadow-sm !mb-2" classNames={{ body: "!p-4" }}>
      <Input placeholder="请输入部门名称" prefix={<SearchOutlined className="text-gray-400"/>} onChange={(e) => setSearch(e.target.value)}/>
      <DeptTree search={search} />
    </Card>
  );
};

export default DeptTreeCard;
