import { FC } from "react";
import { TableProps, Tooltip } from "antd";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { forceLogout, getOnList } from "@/api/monitor/online";
import { Auth, DeleteConfirm } from "@/components";
import { DeleteOutlined } from "@ant-design/icons";

const Table: FC = () => {
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IOnLineItem>["columns"] = [
    // {
    //   title: "序号",
    //   dataIndex: "index",
    //   key: "index",
    //   align: "center",
    //   ellipsis: true,
    //   width: 60,
    // },
    {
      title: "会话编号",
      dataIndex: "tokenId",
      key: "tokenId",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "登录名称",
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
      title: "所属部门",
      dataIndex: "deptName",
      key: "deptName",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "主机",
      dataIndex: "ipaddr",
      key: "ipaddr",
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
      title: "登录时间",
      dataIndex: "loginTime",
      key: "loginTime",
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
      ellipsis: true,
      render: (_, r) => {
        return (
          <Auth role="monitor:online:forceLogout">
            <DeleteConfirm
              id={r.tokenId}
              text={`是否确认强退名称为"${r.userName}"的用户?`}
              delFn={forceLogout}
              onSuccess={queryFn}
            >
              <Tooltip placement="top" title="强退">
                <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </DeleteConfirm>
          </Auth>
        );
      },
    },
  ];

  return (
    <>
      <Query.Table
        isPagination
        rowKey={(e) => e.tokenId}
        queryFn={getOnList}
        columns={columns}
      />
    </>
  );
};

export default Table;
