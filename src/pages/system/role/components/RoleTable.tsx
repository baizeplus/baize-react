import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { changeRoleStatus, delRole, getRoleList } from "@/api/system/role";
import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm, TableItemSwitch } from "@/components";

const RoleTable: FC = () => {
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IRoleItem>["columns"] = [
    {
      title: "角色编号",
      dataIndex: "roleId",
      key: "roleId",
      align: "center",
      width: 120,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "userName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "权限字符",
      dataIndex: "roleKey",
      key: "roleKey",
      align: "center",
      ellipsis: true,
    },
    {
      title: "显示顺序",
      dataIndex: "roleSort",
      key: "roleSort",
      align: "center",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      render: (_, r) => (
        <TableItemSwitch
          name={r.roleName}
          status={r.status}
          idLabel="roleId"
          id={r.roleId}
          tipTag="角色"
          changeStatusFn={changeRoleStatus}
        />
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
            <Auth role="system:role:edit">
              <UpdateRoleDrawer id={r.roleId}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateRoleDrawer>
            </Auth>
            <Auth role="system:role:remove">
              <DeleteConfirm
                id={r.roleId}
                tipTag="角色"
                delFn={delRole}
                onSuccess={queryFn}
              >
                <Tooltip placement="top" title="删除">
                  <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </DeleteConfirm>
            </Auth>
            <Auth role="system:role:edit">
              <Tooltip placement="top" title="分配用户">
                <UserOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
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
        rowKey={(e) => e.roleId}
        queryFn={getRoleList}
        columns={columns}
      />
    </>
  );
};

export default RoleTable;
