import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm } from "@/components";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import { delConfig, getConfigList } from "@/api/system/config";
import DictTag from "@/components/DictTag";
import useDict from "@/hooks/useDict";

const ConfigTable: FC = () => {
  const { queryFn } = Query.useQueryTable();
  const [sys_yes_no] = useDict(["sys_yes_no"]);

  const columns: TableProps<IConfigItem>["columns"] = [
    {
      title: "参数主键",
      dataIndex: "configId",
      key: "configId",
      align: "center",
      ellipsis: true,
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
      render: (t) => <DictTag options={sys_yes_no} value={t} />,
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
      ellipsis: true,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <Auth role="system:config:edit">
              <UpdateDrawer id={r.configId}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateDrawer>
            </Auth>
            <Auth role="system:config:remove">
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
            </Auth>
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
        rowKey={(e) => e.configId}
        queryFn={getConfigList}
        columns={columns}
      />
    </>
  );
};

export default ConfigTable;
