import { FC } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import { Card } from "antd";

type IProps = {
  data?: IServer;
};

const GolangInfoCard: FC<IProps> = ({ data }) => {
  return (
    <Card
      title={
        <div>
          <GoogleOutlined className="mr-2" />
          Golang信息
        </div>
      }
    >
      <ol>
        <li className="flex border-b pb-2 px-2">
          <span className="flex-1 font-medium text-gray-400">属性</span>
          <span className="flex-1 font-medium text-gray-400">值</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">启动时间</span>
          <span className="flex-1 text-gray-500">
            {data?.goStartTime || "-"}
          </span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">运行时长</span>
          <span className="flex-1 text-gray-500">{data?.goRunTime || "-"}</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">安装路径</span>
          <span className="flex-1 text-gray-500">{data?.goHome || "-"}</span>
        </li>
        <li className="flex border-b py-2 px-2">
          <span className="flex-1 text-gray-500">项目路径</span>
          <span className="flex-1 text-gray-500">{data?.goUserDir || "-"}</span>
        </li>
      </ol>
    </Card>
  );
};

export default GolangInfoCard;
