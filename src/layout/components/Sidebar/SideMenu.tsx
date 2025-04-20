import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import useRouterStore from "@/store/router";
import SvgIcon from "@/components/SvgIcon";

const SideMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const sidebarRoutes = useRouterStore((state) => state.sidebarRoutes);

  // 获取当前路径所在的父级菜单路径
  const getParentPathKeys = (path: string): string[] => {
    const pathSegments = path.split("/").filter(Boolean);
    const parentKeys: string[] = [];
    let currentPath = "";

    // 构建父路径
    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += "/" + pathSegments[i];
      parentKeys.push(currentPath.substring(1)); // 去掉最前面的斜杠
    }

    // 特殊处理：增加日志管理相关的菜单
    if (path.includes("operlog") || path.includes("logininfor")) {
      parentKeys.push("system/log");
    }

    return parentKeys;
  };

  useEffect(() => {
    const pathname = location.pathname;
    const currentPath = pathname.replace("/index/", "");
    setSelectedKeys([currentPath]);

    // 获取父级路径作为openKeys
    const parentKeys = getParentPathKeys(currentPath);
    setOpenKeys((prevOpenKeys) => {
      // 保持已经打开的菜单和当前路径的父级菜单都处于打开状态
      const newOpenKeys = [...new Set([...prevOpenKeys, ...parentKeys])];
      return newOpenKeys;
    });
  }, [location.pathname]);

  const items = useMemo(
    () => [
      {
        key: "dashboard",
        icon: <SvgIcon name="dashboard" />,
        label: "首页",
      },
      ...sidebarRoutes,
      {
        key: "web",
        icon: <SvgIcon name="international" />,
        label: "白泽官网",
      },
    ],
    [sidebarRoutes],
  );

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
      items={items}
    />
  );
};

export default SideMenu;
