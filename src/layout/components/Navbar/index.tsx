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
} from "antd";
import { Header } from "antd/es/layout/layout";

// import ScreenfullBtn from "./ScreenfullBtn";
// import GitBtn from "./GitBtn";
// import DocBtn from "./DocBtn";
// import SearchBtn from "./SearchBtn";
import NoticeBtn from "./NoticeBtn";
import useUser from "@/hooks/useUser";
import { logout } from "@/store/user";
import Breadcrumb from "@/components/Breadcrumb";

type INavbarProps = {
  collapsed: boolean;
  onCollapsedIcon: (b: boolean) => void;
};

const Navbar: FC<INavbarProps> = ({ collapsed, onCollapsedIcon }) => {
  const { avatar } = useUser();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

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
    <Header className="!h-10 !p-0 !bg-white mx-2 mt-2 shadow-sm rounded-lg">
      <Flex justify="space-between" align="center" className="h-full">
        <Flex align="center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onCollapsedIcon(!collapsed)}
            className="mt-1 mx-2"
          />
          <Breadcrumb />
        </Flex>
        <Flex className="mr-4" align="center">
          {/* <SearchBtn />
          <GitBtn />
          <DocBtn />
          <ScreenfullBtn /> */}
          <NoticeBtn />
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
                size={28}
                icon={<UserOutlined />}
              />
              <CaretDownOutlined className="text-xs mb-1.5 ml-1 text-gray-400" />
            </Flex>
          </Dropdown>
        </Flex>
      </Flex>
      {contextHolder}
    </Header>
  );
};

export default Navbar;
