import {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
} from "react";
import { Table, TableProps, Tooltip } from "antd";
import dayjs from "dayjs";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";

type IRoleTableProps = {
  list: IRoleItem[];
  selectedIds?: string[];
};

export type IRoleTableRef = {
  roleIds: React.Key[];
};

const RoleTable = forwardRef(
  (
    { list = [], selectedIds }: IRoleTableProps,
    ref: ForwardedRef<IRoleTableRef>,
  ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
      if (selectedIds) {
        handleSelectChange(selectedIds);
      }
    }, [selectedIds]);

    const columns: TableProps<IRoleItem>["columns"] = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 60,
      },
      Table.SELECTION_COLUMN,
      {
        title: "角色编号",
        dataIndex: "roleId",
        key: "roleId",
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
        title: "角色名称",
        dataIndex: "roleName",
        key: "roleName",
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
        title: "权限字符",
        dataIndex: "roleKey",
        key: "roleKey",
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

    const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };

    useImperativeHandle(ref, () => ({
      roleIds: selectedRowKeys,
    }));

    const rowSelection = {
      selectedRowKeys,
      onChange: handleSelectChange,
    };

    return (
      <Table
        rowKey={(e) => e.roleId}
        size="small"
        columns={columns}
        dataSource={list}
        scroll={{ x: 620, y: 400 }}
        rowSelection={rowSelection}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 20,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    );
  },
);

export default RoleTable;
