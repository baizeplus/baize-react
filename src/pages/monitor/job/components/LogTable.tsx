import { FC } from "react";
import { TableProps, Tag, Tooltip } from "antd";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { getJobLogList } from "@/api/monitor/jobLog";

const LogTable: FC = () => {
  const columns: TableProps<IJobLogItem>["columns"] = [
    {
      title: "任务编号",
      dataIndex: "jobLogId",
      key: "jobLogId",
      align: "center",
      width: 160,
    },
    {
      title: "任务名称",
      dataIndex: "jobName",
      key: "jobName",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "任务组名",
      dataIndex: "jobGroup",
      key: "jobGroup",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "调用目标字符串",
      dataIndex: "invokeTarget",
      key: "invokeTarget",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "日志信息",
      dataIndex: "jobMessage",
      key: "jobMessage",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "执行状态",
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
      title: "执行时间",
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
      width: 100,
      render: () => {
        return null;
        // <Flex gap={8}>
        // </Flex>
      },
    },
  ];

  return (
    <>
      <Query.Table
        isRowSelection
        isPagination
        rowKey={(e) => e.jobLogId}
        queryFn={getJobLogList}
        columns={columns}
      />
    </>
  );
};

export default LogTable;
