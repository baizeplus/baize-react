import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  KeyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { getUserList } from "@/api/system/user";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import TableItemSwitch from "./TableItemSwitch";
import UpdateUserModal from "./TableActive/UpdateUserModal";
import DeleteUserModal from "./TableActive/DeleteUserModal";
import ResetPwdModal from "./TableActive/ResetPwdModal";
import UserRoleDrawer from "./UserRoleDrawer/UserRoleDrawer";
import { Auth } from "@/components";
import UpdateUserDataScopeModal from "./UpdateUserDataScopeModal";

const UserTable: FC = () => {
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IUserItem>["columns"] = [
    {
      title: "用户编号",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      ellipsis: true,
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "用户昵称",
      dataIndex: "nickName",
      key: "nickName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "部门",
      dataIndex: "deptName",
      key: "deptName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "手机号码",
      dataIndex: "phonenumber",
      key: "phonenumber",
      align: "center",
      width: 140,
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      ellipsis: true,
      render: (_, r) => <TableItemSwitch status={r.status} userId={r.userId} />,
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
      width: 130,
      fixed: "right",
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <Auth role="system:user:edit">
              <UpdateUserModal id={r.userId} onSuccess={queryFn}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateUserModal>
            </Auth>
            <Auth role="system:user:remove">
              <DeleteUserModal id={r.userId} onSuccess={queryFn}>
                <Tooltip placement="top" title="删除">
                  <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </DeleteUserModal>
            </Auth>
            <Auth role="system:user:resetPwd">
              <ResetPwdModal id={r.userId} name={r.userName}>
                <Tooltip placement="top" title="重置密码">
                  <KeyOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </ResetPwdModal>
            </Auth>
            <Auth role="system:user:edit">
              <UserRoleDrawer id={r.userId}>
                <Tooltip placement="top" title="分配角色">
                  <CheckCircleOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UserRoleDrawer>
            </Auth>
            <Auth role="system:user:edit">
              <UpdateUserDataScopeModal
                id={r.userId}
                userName={r.userName}
                onSuccess={queryFn}
              >
                <Tooltip placement="top" title="数据权限">
                  <UserOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateUserDataScopeModal>
            </Auth>
          </Flex>
        );
      },
    },
  ];

  return (
    <Query.Table
      isRowSelection
      isPagination
      enableColumnVisibility={true}
      rowKey={(e) => e.userId}
      queryFn={getUserList}
      columns={columns}
    />
  );
};

export default UserTable;
