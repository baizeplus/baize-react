import { FC } from "react";
import { Flex, TableProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { delRole, getRoleList } from "@/api/system/role";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm } from "@/components";

const AuthUserTable: FC = () => {
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IRoleItem>["columns"] = [
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
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      align: "center",
      ellipsis: true,
    },
    {
      title: "手机号码",
      dataIndex: "phonenumber",
      key: "phonenumber",
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
      ellipsis: true,
      render: (t: string) => dayjs(t).format(YYYY_MM_DD_HH_mm),
    },
    {
      title: "操作",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 120,
      ellipsis: true,
      render: (_, r) => {
        return (
          <Auth role="system:role:remove">
            <DeleteConfirm
              id={r.roleId}
              tipTag="s"
              delFn={delRole}
              onSuccess={queryFn}
            >
              <Flex
                gap={4}
                className="cursor-pointer !text-primary hover:!text-[#a5b4fc]"
              >
                <CloseOutlined />
                <span>取消授权</span>
              </Flex>
            </DeleteConfirm>
          </Auth>
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

export default AuthUserTable;
