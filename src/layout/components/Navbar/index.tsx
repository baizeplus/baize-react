import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  MenuProps,
  Modal,
  message,
  theme,
} from "antd";
import { Header } from "antd/es/layout/layout";

import ScreenfullBtn from "./ScreenfullBtn";
import GitBtn from "./GitBtn";
import DocBtn from "./DocBtn";
import SearchBtn from "./SearchBtn";
import useUser from "@/hooks/useUser";
import { logout } from "@/store/user";
import NoticeBtn from "./NoticeBtn";

type INavbarProps = {
  collapsed: boolean;
  onCollapsedIcon: (b: boolean) => void;
};

const Navbar: FC<INavbarProps> = ({ collapsed, onCollapsedIcon }) => {
  const { avatar } = useUser();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async () => {
    modal.confirm({
      title: "提示",
      content: "您确定要注销并退出系统吗？",
      onOk: async () => {
        try {
          await logout();
          location.href = "/login";
        } catch (error) {
          message.error("退出失败");
          return error;
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      label: "个人中心",
      key: "/index/user/profile",
    },
    {
      label: "布局设置",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "退出登录",
      key: "logout",
    },
  ];

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Flex justify="space-between" align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapsedIcon(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Flex className="mr-4" align="center">
          <SearchBtn />
          <GitBtn />
          <DocBtn />
          <ScreenfullBtn />
          {/* <NoticeBtn /> */}
          <Dropdown
            arrow
            menu={{
              items,
              onClick: ({ key }) => {
                if (key === "logout") {
                  handleLogout();
                }
                if (key === "/index/user/profile") {
                  navigate("/index/user/profile");
                }
              },
            }}
            trigger={["click"]}
          >
            <Flex align="end" className="cursor-pointer">
              <Avatar
                src={avatar}
                shape="square"
                size={38}
                icon={<UserOutlined />}
              />
              <CaretDownOutlined className="text-xs mb-1 ml-1 text-gray-400" />
            </Flex>
          </Dropdown>
        </Flex>
      </Flex>
      {contextHolder}
    </Header>
  );
};

export default Navbar;
