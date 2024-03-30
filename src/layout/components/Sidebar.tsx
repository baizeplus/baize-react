import { FC, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Menu, Typography } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  ToolOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  UserOutlined,
  TeamOutlined,
  MenuOutlined,
  ApartmentOutlined,
  IdcardOutlined,
  ReadOutlined,
  FormOutlined,
  SoundFilled,
  EditFilled,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";

type ISidebarProps = {
  collapsed: boolean;
};

const Sidebar: FC<ISidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([
    location.pathname.replace("/index/", ""),
  ]);
  const [openKeys, setOpenKeys] = useState([location.pathname.split("/")[2]]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="text-center pt-5 pb-2">
        <Link to="/index">
          <Typography.Title ellipsis level={5} className="!text-white">
            白泽<span className={`${collapsed && "hidden"}`}>管理系统</span>
          </Typography.Title>{" "}
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        onClick={({ key }) => {
          if (key === "web") {
            open("baize.vip");
            return false;
          }
          navigate(`/index/${key}`);
        }}
        items={[
          {
            key: "",
            icon: <DashboardOutlined />,
            label: "首页",
          },
          {
            key: "system",
            icon: <SettingOutlined />,
            label: "系统管理",
            children: [
              {
                key: "system/user",
                icon: <UserOutlined />,
                label: "用户管理",
              },
              {
                key: "system/role",
                icon: <TeamOutlined />,
                label: "角色管理",
              },
              {
                key: "system/menu",
                icon: <MenuOutlined />,
                label: "菜单管理",
              },
              {
                key: "system/dept",
                icon: <ApartmentOutlined />,
                label: "部门管理",
              },
              {
                key: "system/post",
                icon: <IdcardOutlined />,
                label: "岗位管理",
              },
              {
                key: "system/dict",
                icon: <ReadOutlined />,
                label: "字典管理",
              },
              {
                key: "system/config",
                icon: <FormOutlined />,
                label: "参数管理",
              },
              {
                key: "system/notice",
                icon: <SoundFilled />,
                label: "通知公告",
              },
              {
                key: "system/log",
                icon: <EditFilled />,
                label: "日志管理",
                children: [
                  {
                    key: "system/operlog",
                    icon: <EditOutlined />,
                    label: "操作日志",
                  },
                  {
                    key: "system/logininfor",
                    icon: <SolutionOutlined />,
                    label: "登录日志",
                  },
                ],
              },
            ],
          },
          {
            key: "monitor",
            icon: <FundProjectionScreenOutlined />,
            label: "系统监控",
          },
          {
            key: "tool",
            icon: <ToolOutlined />,
            label: "系统工具",
          },
          {
            key: "web",
            icon: <GlobalOutlined />,
            label: "白泽官网",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
