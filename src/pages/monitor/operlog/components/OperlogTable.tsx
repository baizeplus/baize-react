import { FC } from "react";
import { TableProps, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth } from "@/components";
// import UpdateDrawer from "./TableActive/UpdateDrawer";
import { getOperlogList } from "@/api/monitor/operlog";

const Table: FC = () => {
  // const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IPostItem>["columns"] = [
    {
      title: "日志编号",
      dataIndex: "operId",
      key: "operId",
      align: "center",
      width: 160,
    },
    {
      title: "系统模块",
      dataIndex: "title",
      key: "title",
      align: "center",
      ellipsis: true,
    },
    {
      title: "操作类型",
      dataIndex: "businessType",
      key: "businessType",
      align: "center",
      ellipsis: true,
    },
    {
      title: "操作人员",
      dataIndex: "operName",
      key: "operName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "操作地址",
      dataIndex: "operIp",
      key: "operIp",
      align: "center",
      ellipsis: true,
    },
    {
      title: "操作状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      render: (t) => (
        <Tag
          color={t === "0" ? "#e6f4ff" : "#fff1f0"}
          className={t === "0" ? "!text-primary" : "!text-[#ff4d4f]"}
        >
          {t === "0" ? "正常" : "停用"}
        </Tag>
      ),
    },
    {
      title: "操作日期",
      dataIndex: "operTime",
      key: "operTime",
      align: "center",
      width: 160,
      ellipsis: true,
      render: (t: string) => dayjs(t).format(YYYY_MM_DD_HH_mm),
    },
    {
      title: "消耗时间",
      dataIndex: "costTime",
      key: "costTime",
      align: "center",
      width: 160,
      ellipsis: true,
      render: (t: string) => `${t}毫秒`,
    },
    {
      title: "操作",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 100,
      render: () => {
        return (
          <Auth role="monitor:operlog:query">
            <Tooltip placement="top" title="查看">
              <EyeOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
            </Tooltip>
          </Auth>
        );
      },
    },
  ];

  return (
    <>
      <Query.Table
        isRowSelection
        rowKey={(e) => e.operId}
        queryFn={getOperlogList}
        columns={columns}
      />
    </>
  );
};

export default Table;
