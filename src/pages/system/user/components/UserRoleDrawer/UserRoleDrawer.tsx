import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Drawer,
  Avatar,
  Space,
  Flex,
  Tooltip,
  Typography,
  App,
} from "antd";
import {
  CompressOutlined,
  ExpandOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getAuthRole, updateAuthRole } from "@/api/user";
import RoleTable, { IRoleTableRef } from "./RoleTable";

type IUserRoleDrawerProps = {
  id: string;
  children?: React.ReactNode;
};

const UserRoleDrawer: FC<IUserRoleDrawerProps> = ({ id, children }) => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [wider, setWider] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserProfile>();
  const [roleList, setRoleList] = useState<IRoleItem[]>([]);
  const [roleIds, setRoleIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const roleTableRef = useRef<IRoleTableRef>(null);

  const getUserAuthRole = useCallback(async () => {
    if (id && open) {
      const { data } = await getAuthRole(id);
      setUserInfo(data.user);
      setRoleIds(data.roleIds);
      setRoleList(
        data.roles.map((item: IRoleItem, index: number) => ({
          index: index + 1,
          ...item,
        })),
      );
    }
  }, [id, open]);

  useEffect(() => {
    getUserAuthRole();
  }, [getUserAuthRole]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateAuthRole({
        userId: id,
        roleIds: roleTableRef?.current?.roleIds.join(",") || "",
      });
      message.success("操作成功");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Drawer
        width={wider ? 820 : 378}
        open={open}
        title="分配角色"
        onClose={handleClose}
        classNames={{
          body: "!p-4",
        }}
        extra={
          <Space size="middle">
            <Tooltip title={wider ? "缩略" : "更多"}>
              {wider ? (
                <CompressOutlined onClick={() => setWider(false)} />
              ) : (
                <ExpandOutlined onClick={() => setWider(true)} />
              )}
            </Tooltip>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleSubmit} type="primary" loading={loading}>
              提交
            </Button>
          </Space>
        }
      >
        <Card
          title="基本信息"
          classNames={{ header: "!p-2 !min-h-0	", body: "!p-2" }}
        >
          <Flex align="center">
            <Avatar src={userInfo?.avatar} icon={<UserOutlined />} size={45} />
            <Flex vertical className="ml-4">
              <p className="w-full truncate">{userInfo?.nickName}</p>
              <Typography.Text ellipsis>{userInfo?.userName}</Typography.Text>
            </Flex>
          </Flex>
        </Card>

        <Card
          title="角色信息"
          className="!mt-2"
          classNames={{ header: "!p-2 !min-h-0	", body: "!p-2" }}
        >
          <RoleTable ref={roleTableRef} list={roleList} selectedIds={roleIds} />
        </Card>
      </Drawer>
    </>
  );
};

export default UserRoleDrawer;
