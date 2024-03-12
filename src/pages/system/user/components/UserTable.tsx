import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { getUserList } from "@/api/system/user";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  FormOutlined,
  KeyOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { YYYY_MM_DD_HH_mm } from "@/utils/constant";
import TableItemSwitch from "./TableItemSwitch";
import UpdateUserModal from "./TableActive/UpdateUserModal";
import DeleteUserModal, { IDeleteUserRefProps } from "./TableActive/DeleteUserModal";
import ResetPwdModal from "./TableActive/ResetPwdModal";
import ExportButton from "./ExportButton";

type IProps = {
  searchParams: IUserSearchParams;
};

const UserTable: FC<IProps> = ({ searchParams }) => {
  const [list, setList] = useState<IUserItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const deleteRef = useRef<IDeleteUserRefProps>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  /** 查询用户列表 */
  const getList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getUserList(searchParams);
      setList(data.rows);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    getList();
  }, [getList]);

  const columns: TableProps<IUserItem>["columns"] = [
    {
      title: "用户编号",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      width: 120,
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
      width: 110,
      render: (_, r) => {
        return (
          <Flex gap={8}>
            <UpdateUserModal id={r.userId} onSuccess={getList}>
              <Tooltip placement="top" title="修改">
                <FormOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </UpdateUserModal>
            <DeleteUserModal id={r.userId} onSuccess={getList}>
              <Tooltip placement="top" title="删除">
                <DeleteOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </DeleteUserModal>
            <ResetPwdModal id={r.userId} name={r.userName}>
              <Tooltip placement="top" title="重置密码">
                <KeyOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
              </Tooltip>
            </ResetPwdModal>
            <Tooltip placement="top" title="分配角色">
              <CheckCircleOutlined className="!text-primary hover:!text-[#a5b4fc] cursor-pointer" />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  return (
    <div>
      <Flex justify="space-between" className="mb-2">
        <Flex gap="small">
          <UpdateUserModal onSuccess={getList}>
            <Button type="primary" icon={<PlusOutlined />}>
              新增
            </Button>
          </UpdateUserModal>
          <UpdateUserModal id={(selectedRowKeys[0] || '') as string} onSuccess={getList}>
            <Button  disabled={!selectedRowKeys.length || selectedRowKeys.length > 1} type="primary" icon={<FormOutlined />}>
              修改
            </Button>
          </UpdateUserModal>
          <DeleteUserModal ref={deleteRef} onSuccess={getList}>
            <Button
              danger
              ghost
              disabled={!selectedRowKeys.length}
              icon={<DeleteOutlined />}
              onClick={() =>
                deleteRef.current?.deleteUser(selectedRowKeys.join(","))
              }
            >
              删除
            </Button>
          </DeleteUserModal>
          <Button type="primary" ghost icon={<CloudUploadOutlined />}>
            导入
          </Button>
          <ExportButton />
        </Flex>
        <Flex gap="small">
          <Tooltip title="隐藏搜索">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
          <Tooltip title="刷新">
            <Button shape="circle" icon={<SyncOutlined />} onClick={getList} />
          </Tooltip>
          <Tooltip title="显隐列">
            <Dropdown
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
              dropdownRender={() => (
                <div className="bg-white py-2 px-3 rounded shadow">
                  <Checkbox.Group
                    className="flex flex-col"
                    // options={columns.map(item => item.title)}
                  />
                </div>
              )}
            >
              <Button shape="circle" icon={<AppstoreOutlined />} />
            </Dropdown>
          </Tooltip>
        </Flex>
      </Flex>
      <Table
        rowKey={(e) => e.userId}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={list}
        loading={loading}
        pagination={{
          showTotal: (total) => `共 ${total} 条`,
          total: total,
        }}
      />
    </div>
  );
};

export default UserTable;
