import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm } from "@/components";
import { delDept, getDeptList } from "@/api/system/dept";
import UpdateDrawer from "./TableActive/UpdateDrawer";
import useDict from "@/hooks/useDict";
import DictTag from "@/components/DictTag";

const DeptTable: FC = () => {
  const { queryFn } = Query.useQueryTable();
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);

  const columns: TableProps<IDeptItem>["columns"] = [
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
      render: (t) => <DictTag options={sys_normal_disable} value={t} />,
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
            <Auth role="system:dept:edit">
              <UpdateDrawer id={r.deptId}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateDrawer>
            </Auth>
            <Auth role="system:dept:add">
              <UpdateDrawer parentId={r.deptId}>
                <Tooltip placement="top" title="新增">
                  <PlusOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateDrawer>
            </Auth>
            <Auth role="system:dept:remove">
              <DeleteConfirm
                id={r.deptId}
                text={`是否确认删除名称为"${r.deptName}"的数据项?`}
                delFn={delDept}
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
        idkey="deptId"
        rowKey={(e) => e.deptId}
        isTree
        expandable={{
          defaultExpandAllRows: true,
        }}
        queryFn={getDeptList}
        columns={columns}
      />
    </>
  );
};

export default DeptTable;
