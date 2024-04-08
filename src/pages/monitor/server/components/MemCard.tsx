import { FC } from "react";
import { DatabaseOutlined } from "@ant-design/icons";
import { Card } from "antd";

type IProps = {
  data?: IServer;
};

const MemCard: FC<IProps> = ({ data }) => {
  return (
    <Card
      className="h-full"
      title={
        <div>
          <DatabaseOutlined className="mr-2" />
          内存
        </div>
      }
    >
      <ol>
        <li className="flex border-b pb-2 px-2">
          <span className="flex-1 font-medium text-gray-400">属性</span>
          <span className="flex-1 font-medium text-gray-400">内存</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">总内存</span>
          <span className="flex-1 text-gray-500">{data?.memUsed}G</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">已用内存</span>
          <span className="flex-1 text-gray-500">{data?.cpuNumThread}G</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">剩余内存</span>
          <span className="flex-1 text-gray-500">{data?.memFree}G</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">使用率</span>
          <span className="flex-1 text-gray-500">{data?.cpuAvg5}%</span>
        </li>
      </ol>
    </Card>
  );
};

export default MemCard;
