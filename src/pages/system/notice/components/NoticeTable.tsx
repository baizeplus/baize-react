import { FC } from "react";
import { TableProps, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { getNoticeList } from "@/api/system/notice";
import DictTag from "@/components/DictTag";
import useDict from "@/hooks/useDict";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { Auth } from "@/components";

const NoticeTable: FC = () => {
  const [sys_notice_type] = useDict(["sys_notice_type"]);

  const columns: TableProps<INoticeItem>["columns"] = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 190,
      ellipsis: true,
    },
    {
      title: "公告标题",
      dataIndex: "title",
      key: "noticeTitle",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "公告类型",
      dataIndex: "type",
      key: "type",
      align: "center",
      ellipsis: true,
      render: (t) => <DictTag options={sys_notice_type} value={t} />,
    },
    {
      title: "创建者",
      dataIndex: "createName",
      key: "createName",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 160,
      ellipsis: true,
      render: (t: string) => dayjs(t).format(YYYY_MM_DD_HH_mm),
    },
    {
      title: "操作",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 80,
      ellipsis: true,
      render: (_, r) => (
        <Auth role="system:notice:query">
          <UpdateDrawer id={r.id}>
            <Tooltip placement="top" title="查看">
              <EyeOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
            </Tooltip>
          </UpdateDrawer>
        </Auth>
      ),
    },
  ];

  return (
    <>
      <Query.Table
        isRowSelection
        rowKey={(e) => e.id}
        queryFn={getNoticeList}
        columns={columns}
      />
    </>
  );
};

export default NoticeTable;
