import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
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
  WifiOutlined,
  FieldTimeOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";

const SideMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { sidebarRoutes } = useRouter();

  useEffect(() => {
    const pathname = location.pathname;
    setSelectedKeys([pathname.replace("/index/", "")]);
    setOpenKeys(pathname.split("/"));
  }, [location.pathname, navigate]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={setOpenKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
      onClick={({ key }) => {
        if (key === "web") {
          open("http://react.ibaize.vip");
          return false;
        }
        navigate(`/index/${key}`);
      }}
      items={[
        {
          key: "dashboard",
          icon: <DashboardOutlined />,
          label: "首页",
        },
        ...sidebarRoutes,
        // {
        //   key: "system",
        //   icon: <SettingOutlined />,
        //   label: "系统管理",
        //   children: [
        //     {
        //       key: "system/user",
        //       icon: <UserOutlined />,
        //       label: "用户管理",
        //     },
        //     {
        //       key: "system/role",
        //       icon: <TeamOutlined />,
        //       label: "角色管理",
        //     },
        //     {
        //       key: "system/menu",
        //       icon: <MenuOutlined />,
        //       label: "菜单管理",
        //     },
        //     {
        //       key: "system/dept",
        //       icon: <ApartmentOutlined />,
        //       label: "部门管理",
        //     },
        //     {
        //       key: "system/post",
        //       icon: <IdcardOutlined />,
        //       label: "岗位管理",
        //     },
        //     {
        //       key: "system/dict",
        //       icon: <ReadOutlined />,
        //       label: "字典管理",
        //     },
        //     {
        //       key: "system/config",
        //       icon: <FormOutlined />,
        //       label: "参数管理",
        //     },
        //     {
        //       key: "system/notice",
        //       icon: <SoundFilled />,
        //       label: "通知公告",
        //     },
        //     {
        //       key: "system/log",
        //       icon: <EditFilled />,
        //       label: "日志管理",
        //       children: [
        //         {
        //           key: "system/log/operlog",
        //           icon: <EditOutlined />,
        //           label: "操作日志",
        //         },
        //         {
        //           key: "system/log/logininfor",
        //           icon: <SolutionOutlined />,
        //           label: "登录日志",
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   key: "monitor",
        //   icon: <FundProjectionScreenOutlined />,
        //   label: "系统监控",
        //   children: [
        //     {
        //       key: "monitor/online",
        //       icon: <WifiOutlined />,
        //       label: "在线用户",
        //     },
        //     {
        //       key: "monitor/job",
        //       icon: <FieldTimeOutlined />,
        //       label: "定时任务",
        //     },
        //     {
        //       key: "monitor/server",
        //       icon: <FundProjectionScreenOutlined />,
        //       label: "服务监控",
        //     },
        //   ],
        // },
        // {
        //   key: "tool",
        //   icon: <ToolOutlined />,
        //   label: "系统工具",
        //   children: [
        //     {
        //       key: "tool/swagger",
        //       icon: <ControlOutlined />,
        //       label: "系统接口",
        //     },
        //   ],
        // },
        {
          key: "web",
          icon: <GlobalOutlined />,
          label: "白泽官网",
        },
      ]}
    />
  );
};

export default SideMenu;
