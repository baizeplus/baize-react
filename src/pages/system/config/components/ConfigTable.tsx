import { FC } from "react";
import { Flex, TableProps, Tag, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm } from "@/components";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { delConfig, getConfigList } from "@/api/system/config";

const ConfigTable: FC = () => {
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IConfigItem>["columns"] = [
    {
      title: "参数主键",
      dataIndex: "configId",
      key: "configId",
      align: "center",
      width: 160,
    },
    {
      title: "参数名称",
      dataIndex: "configName",
      key: "configName",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "参数键名",
      dataIndex: "configKey",
      key: "configKey",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "参数键值",
      dataIndex: "configValue",
      key: "configValue",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      ),
    },
    {
      title: "系统内置",
      dataIndex: "configType",
      key: "configType",
      align: "center",
      ellipsis: true,
      render: (t) => (
        <Tag
          color={t === "Y" ? "#e6f4ff" : "#fff1f0"}
          className={t === "Y" ? "!text-primary" : "!text-[#ff4d4f]"}
        >
          {t === "Y" ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
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
      width: 100,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <UpdateDrawer id={r.configId}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDrawer>
            <DeleteConfirm
              id={r.configId}
              text={`是否确认删除参数编号为"${r.configId}"的数据项?`}
              delFn={delConfig}
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
        rowKey={(e) => e.configId}
        queryFn={getConfigList}
        columns={columns}
      />
    </>
  );
};

export default ConfigTable;
