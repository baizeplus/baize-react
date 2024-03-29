import { FC } from "react";
import { Flex, TableProps, Tag, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm } from "@/components";
import { delMenu } from "@/api/system/menu";
import { getDeptList } from "@/api/system/dept";
import UpdateDrawer from "./TableActive/UpdateDrawer";

const DeptTable: FC = () => {
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IMenuItem>["columns"] = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
      align: "center",
      width: 160,
    },
    {
      title: "排序",
      dataIndex: "orderNum",
      key: "orderNum",
      align: "center",
      ellipsis: true,
    },
    {
      title: "状态",
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
            <UpdateDrawer id={r.deptId}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDrawer>
            <UpdateDrawer parentId={r.deptId}>
              <Tooltip placement="top" title="新增">
                <PlusOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateDrawer>
            <DeleteConfirm
              id={r.deptId}
              tipTag="部门"
              delFn={delMenu}
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
        isTree
        expandable={{
          defaultExpandAllRows: true,
        }}
        rowKey={(e) => e.deptId}
        queryFn={getDeptList}
        columns={columns}
      />
    </>
  );
};

export default DeptTable;
