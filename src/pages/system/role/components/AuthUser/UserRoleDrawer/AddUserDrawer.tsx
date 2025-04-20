import { FC, useRef, useState } from "react";
import { Button, Card, Drawer, Space, Tooltip, App } from "antd";
import { CompressOutlined, ExpandOutlined } from "@ant-design/icons";
import UserTable, { IUserTableRef } from "./Table";
import Query from "@/components/QueryTable";
import TableSearchForm from "../TableSearchForm";
import { authUserSelectAll } from "@/api/system/role";
import { useParams } from "react-router-dom";

type IAddUserDrawerProps = {
  children?: React.ReactNode;
};

const AddUserDrawer: FC<IAddUserDrawerProps> = ({ children }) => {
  const { roleId } = useParams();
  const { message } = App.useApp();
  const { queryFn } = Query.useQueryTable();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(false);
  const [loading, setLoading] = useState(false);
  const userTableRef = useRef<IUserTableRef>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await authUserSelectAll({
        userIds: userTableRef.current?.userIds.join(",") || "",
        roleId: roleId,
      });
      queryFn?.();
      message.success("操作成功");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Query>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Drawer
        width={width ? 820 : 378}
        open={open}
        destroyOnClose
        title="选择用户"
        onClose={handleClose}
        classNames={{
          body: "!p-4",
        }}
        extra={
          <Space size="middle">
            <Tooltip title={width ? "缩略" : "更多"}>
              {width ? (
                <CompressOutlined onClick={() => setWidth(false)} />
              ) : (
                <ExpandOutlined onClick={() => setWidth(true)} />
              )}
            </Tooltip>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleSubmit} type="primary" loading={loading}>
              提交
            </Button>
          </Space>
        }
      >
        <TableSearchForm />

        <Card
          className="!mt-2"
          classNames={{ header: "!p-2 !min-h-0	", body: "!p-2" }}
        >
          <UserTable ref={userTableRef} />
        </Card>
      </Drawer>
    </Query>
  );
};

export default AddUserDrawer;
