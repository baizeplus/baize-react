import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

import Query from "@/components/QueryTable";
import { DeleteConfirm, DictTag } from "@/components";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { delJob, getJobList } from "@/api/monitor/job";
import useDict from "@/hooks/useDict";

const Table: FC = () => {
  const { queryFn } = Query.useQueryTable();
  const [sys_job_status] = useDict(["sys_job_status"]);

  const columns: TableProps<IJobItem>["columns"] = [
    {
      title: "任务编号",
      dataIndex: "jobId",
      key: "jobId",
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
      title: "cron执行表达式",
      dataIndex: "cronExpression",
      key: "cronExpression",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      render: (t) => <DictTag options={sys_job_status} value={String(t)} />,
    },
    {
      title: "操作",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 100,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <UpdateDrawer id={r.jobId}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDrawer>
            <DeleteConfirm
              id={r.jobId}
              text={`是否确认删除定时任务编号为"${r.jobId}"的数据项?`}
              delFn={delJob}
              onSuccess={queryFn}
            >
              <Tooltip placement="top" title="删除">
                <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </DeleteConfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Query.Table
        isRowSelection
        isPagination
        rowKey={(e) => e.jobId}
        queryFn={getJobList}
        columns={columns}
      />
    </>
  );
};

export default Table;
