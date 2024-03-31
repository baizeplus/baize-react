import { FC } from "react";
import { TableProps, Tag, Tooltip } from "antd";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { getLogininforList } from "@/api/monitor/logininfor";

const Table: FC = () => {
  const columns: TableProps<ILogininforItem>["columns"] = [
    {
      title: "访问编号",
      dataIndex: "infoId",
      key: "infoId",
      align: "center",
      ellipsis: true,
      // width: 120,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "地址",
      dataIndex: "ipAddr",
      key: "ipAddr",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "登录地点",
      dataIndex: "loginLocation",
      key: "loginLocation",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "操作系统",
      dataIndex: "os",
      key: "os",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      key: "browser",
      align: "center",
      ellipsis: true,
      width: 90,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "登录状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      width: 90,
      render: (t) => (
        <Tag
          color={t === 0 ? "#e6f4ff" : "#fff1f0"}
          className={t === 0 ? "!text-primary" : "!text-[#ff4d4f]"}
        >
          {t === 0 ? "成功" : "失败"}
        </Tag>
      ),
    },
    {
      title: "描述",
      dataIndex: "msg",
      key: "msg",
      align: "center",
      width: 100,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "访问时间",
      dataIndex: "loginTime",
      key: "loginTime",
      align: "center",
      width: 160,
      ellipsis: true,
      render: (t: string) => dayjs(t).format(YYYY_MM_DD_HH_mm),
    },
  ];

  return (
    <>
      <Query.Table
        isRowSelection
        isPagination
        rowKey={(e) => e.infoId}
        queryFn={getLogininforList}
        columns={columns}
      />
    </>
  );
};

export default Table;
