import { RobotOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { FC } from "react";

type IProps = {
  data?: IServer;
};

const CpuInfoCard: FC<IProps> = ({ data }) => {
  return (
    <Card
      title={
        <div>
          <RobotOutlined className="mr-2" />
          CPU
        </div>
      }
    >
      <ol>
        <li className="flex border-b pb-2 px-2">
          <span className="flex-1 font-medium text-gray-400">属性</span>
          <span className="flex-1 font-medium text-gray-400">值</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">核心数</span>
          <span className="flex-1 text-gray-500">{data?.cpuNum}</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">线程数</span>
          <span className="flex-1 text-gray-500">{data?.cpuNumThread}</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">过去的1分平均负载</span>
          <span className="flex-1 text-gray-500">{data?.cpuAvg1}%</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">过去的5分平均负载</span>
          <span className="flex-1 text-gray-500">{data?.cpuAvg5}%</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">过去的15分平均负载</span>
          <span className="flex-1 text-gray-500">{data?.cpuAvg15}%</span>
        </li>
      </ol>
    </Card>
  );
};

export default CpuInfoCard;
