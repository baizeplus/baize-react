import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { Table, TableProps, Tooltip } from "antd";
import dayjs from "dayjs";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import Query from "@/components/QueryTable";
import { unallocatedUserList } from "@/api/system/role";
import { useParams } from "react-router-dom";

export type IUserTableRef = {
  userIds: React.Key[];
};

const UserTable = forwardRef((_props, ref: ForwardedRef<IUserTableRef>) => {
  const { roleId } = useParams();
  const { selectedRowId } = Query.useQueryTable();

  const columns: TableProps<IUserItem>["columns"] = [
    Table.SELECTION_COLUMN,
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
      ellipsis: true,
      render: (t) => {
        return (
          <Tooltip title={t} placement="topLeft">
            {t}
          </Tooltip>
        );
      },
    },
    {
      title: "用户昵称",
      dataIndex: "nickName",
      key: "nickName",
      ellipsis: true,
      render: (t) => {
        return (
          <Tooltip title={t} placement="topLeft">
            {t}
          </Tooltip>
        );
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: (t) => {
        return (
          <Tooltip title={t} placement="topLeft">
            {t}
          </Tooltip>
        );
      },
    },
    {
      title: "手机号码",
      dataIndex: "phonenumber",
      key: "phonenumber",
      ellipsis: true,
      render: (t) => {
        return (
          <Tooltip title={t} placement="topLeft">
            {t}
          </Tooltip>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
      render: (text) => {
        return dayjs(text).format(YYYY_MM_DD_HH_mm);
      },
    },
  ];

  const _queryFn = useCallback(
    (...args: Parameters<typeof unallocatedUserList>) => {
      return unallocatedUserList({ roleId, ...args[0] });
    },
    [roleId],
  );

  useImperativeHandle(ref, () => ({
    userIds: selectedRowId,
  }));

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
});

export default UserTable;
