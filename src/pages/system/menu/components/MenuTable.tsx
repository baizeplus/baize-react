import { FC } from "react";
import { Flex, TableProps, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
// import UpdateRoleDrawer from "./TableActive/UpdateRoleDrawer";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { DeleteConfirm } from "@/components";
import { delMenu, getMenuList } from "@/api/system/menu";
import UpdateMenuDrawer from "./TableActive/UpdateDrawer";
import useDict from "@/hooks/useDict";
import DictTag from "@/components/DictTag";

const MenuTable: FC = () => {
  const [sys_normal_disable] = useDict(["sys_normal_disable"]);
  const { queryFn } = Query.useQueryTable();
  const columns: TableProps<IMenuItem>["columns"] = [
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName",
      align: "center",
      width: 160,
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
      align: "center",
      ellipsis: true,
    },
    {
      title: "排序",
      dataIndex: "orderNum",
      key: "orderNum",
      align: "center",
      ellipsis: true,
    },
    {
      title: "权限标识",
      dataIndex: "perms",
      key: "perms",
      align: "center",
      ellipsis: true,
    },
    {
      title: "组件路径",
      dataIndex: "component",
      key: "component",
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
        <DictTag options={sys_normal_disable} value={t} />
        // <Tag
        //   color={t === "0" ? "#e6f4ff" : "#fff1f0"}
        //   className={t === "0" ? "!text-primary" : "!text-[#ff4d4f]"}
        // >
        //   {t === "0" ? "正常" : "停用"}
        // </Tag>
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
            <UpdateMenuDrawer id={r.menuId}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateMenuDrawer>
            <UpdateMenuDrawer parentId={r.menuId}>
              <Tooltip placement="top" title="新增">
                <PlusOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateMenuDrawer>
            <DeleteConfirm
              id={r.menuId}
              tipTag="菜单"
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
        idkey="menuId"
        rowKey={(e) => e.menuId}
        queryFn={getMenuList}
        columns={columns}
      />
    </>
  );
};

export default MenuTable;
