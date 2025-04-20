import { FC, useCallback } from "react";
import { Flex, TableProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Query from "@/components/QueryTable";
import { allocatedUserList, authUserCancel } from "@/api/system/role";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import { Auth, DeleteConfirm } from "@/components";
import { useParams } from "react-router-dom";

const AuthUserTable: FC = () => {
  const { roleId } = useParams();
  const { queryFn } = Query.useQueryTable();

  const columns: TableProps<IUserItem>["columns"] = [
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
              text={`确认要取消「${r.userName}」用户的角色？`}
              delFn={() => authUserCancel({ roleId: roleId, userId: r.userId })}
              okText="确认"
              onSuccess={() => queryFn?.("del")}
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
  const _queryFn = useCallback(
    (...args: Parameters<typeof allocatedUserList>) => {
      return allocatedUserList({ roleId, ...args[0] });
    },
    [roleId],
  );

  return (
    <>
      <Query.Table
        isRowSelection
        isPagination
        rowKey={(e) => e.userId}
        queryFn={_queryFn}
        columns={columns}
      />
    </>
  );
};

export default AuthUserTable;
