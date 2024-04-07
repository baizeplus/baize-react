import { FC } from "react";
import { Card, Table, TableProps } from "antd";
import { HddOutlined } from "@ant-design/icons";

type IProps = {
  data?: IServer;
};

const DiskCard: FC<IProps> = ({ data }) => {
  const columns: TableProps<IDiskItem & { index: number }>["columns"] = [
    {
      title: "盘符路径",
      dataIndex: "path",
      key: "path",
      align: "center",
      width: 160,
    },
    {
      title: "文件系统",
      dataIndex: "fstype",
      key: "fstype",
      align: "center",
      width: 160,
    },
    {
      title: "总大小",
      dataIndex: "total",
      key: "total",
      align: "center",
      width: 160,
    },
    {
      title: "可用大小",
      dataIndex: "free",
      key: "free",
      align: "center",
      width: 160,
    },
    {
      title: "已用大小",
      dataIndex: "used",
      key: "used",
      align: "center",
      width: 160,
    },
    {
      title: "已用百分比",
      dataIndex: "usedPercent",
      key: "usedPercent",
      align: "center",
      width: 160,
      render: (t) => (
        <span className={`${t > 80 ? "text-red-500" : ""}`}>{t}%</span>
      ),
    },
  ];
  return (
    <Card
      className="!mt-3"
      title={
        <div>
          <HddOutlined className="mr-2" />
          磁盘状态
        </div>
      }
    >
      <Table
        rowKey={(e) => e.index}
        columns={columns}
        dataSource={
          data?.diskList?.map((item, index) => ({ ...item, index })) || []
        }
        pagination={false}
      />
    </Card>
  );
};

export default DiskCard;
