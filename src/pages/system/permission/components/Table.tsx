import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm } from "@/components";
import { delPermission, getPermissionList } from "@/api/system/permission";
import UpdateMenuDrawer from "./TableActive/UpdateDrawer";
import useDict from "@/hooks/useDict";
import DictTag from "@/components/DictTag";

const MenuTable: FC = () => {
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const { queryFn } = Query.useQueryTable();
  const columns: TableProps<IPermissionItem>["columns"] = [
    {
      title: "权限名称",
      dataIndex: "permissionName",
      key: "permissionName",
      align: "center",
      ellipsis: true,
      width: 160,
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      align: "center",
      ellipsis: true,
    },
    {
      title: "权限标识",
      dataIndex: "permission",
      key: "permission",
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
            <Auth role="system:permission:edit">
              <UpdateMenuDrawer id={r.permissionId}>
                <Tooltip placement="top" title="修改">
                  <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateMenuDrawer>
            </Auth>
            <Auth role="system:permission:add">
              <UpdateMenuDrawer parentId={r.permissionId}>
                <Tooltip placement="top" title="新增">
                  <PlusOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
                </Tooltip>
              </UpdateMenuDrawer>
            </Auth>
            <Auth role="system:permission:remove">
              <DeleteConfirm
                id={r.permissionId}
                tipTag="权限"
                delFn={delPermission}
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
        isTree
        scroll={{ x: 750 }}
        idkey="permissionId"
        rowKey={(e) => e.permissionId}
        queryFn={getPermissionList}
        columns={columns}
      />
    </>
  );
};

export default MenuTable;
