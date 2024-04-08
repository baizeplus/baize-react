import { FC } from "react";
import { DesktopOutlined } from "@ant-design/icons";
import { Card } from "antd";

type IProps = {
  data?: IServer;
};

const SysInfoCard: FC<IProps> = ({ data }) => {
  return (
    <Card
      title={
        <div>
          <DesktopOutlined className="mr-2" />
          服务器信息
        </div>
      }
    >
      <ol>
        <li className="flex border-b pb-2 px-2">
          <span className="flex-1 font-medium text-gray-400">属性</span>
          <span className="flex-1 font-medium text-gray-400">值</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">服务器名称</span>
          <span className="flex-1 text-gray-500">
            {data?.sysComputerName || "-"}
          </span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">操作系统</span>
          <span className="flex-1 text-gray-500">{data?.sysOsName || "-"}</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">服务器IP</span>
          <span className="flex-1 text-gray-500">
            {data?.sysComputerIp || "-"}
          </span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">系统架构</span>
          <span className="flex-1 text-gray-500">{data?.sysOsArch || "-"}</span>
        </li>
      </ol>
    </Card>
  );
};

export default SysInfoCard;
