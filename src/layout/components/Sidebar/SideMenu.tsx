import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import useRouterStore from "@/store/router";
import SvgIcon from "@/components/SvgIcon";
import { routes } from "@/routes/routes";

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

  // 构建隐藏路由到侧边栏菜单的映射关系
  const hiddenRouteToMenuMap = useMemo(() => {
    const map = new Map<string, string>();

    routes.forEach((route: any) => {
      if (route.hidden && route.parentMenuKey) {
        // 构建路由键
        let routeKey = route.path;

        // 处理动态路由
        if (route.path.includes(":")) {
          routeKey = route.path.replace(/:\w+/g, "*");
        }

        // 构建完整路由键
        if (route.parentName === "System") {
          const cleanPath = routeKey.startsWith("/")
            ? routeKey.substring(1)
            : routeKey;
          routeKey = `system/${cleanPath}`;
        } else if (route.parentName === "Monitor") {
          const cleanPath = routeKey.startsWith("/")
            ? routeKey.substring(1)
            : routeKey;
          routeKey = `monitor/${cleanPath}`;
        } else if (route.parentName === "Tool") {
          const cleanPath = routeKey.startsWith("/")
            ? routeKey.substring(1)
            : routeKey;
          routeKey = `tool/${cleanPath}`;
        }

        map.set(routeKey, route.parentMenuKey);
      }
    });

    return map;
  }, []);

  // 根据当前路径找到对应的侧边栏菜单项
  const findSelectedMenuKey = useMemo(() => {
    return (path: string): string => {
      // 先检查是否有直接匹配的隐藏路由配置
      const directMatch = hiddenRouteToMenuMap.get(path);
      if (directMatch) {
        return directMatch;
      }

      // 检查动态路由匹配
      for (const [routePattern, menuKey] of hiddenRouteToMenuMap.entries()) {
        if (routePattern.includes("*")) {
          const regex = new RegExp(`^${routePattern.replace(/\*/g, "[^/]+")}$`);
          if (regex.test(path)) {
            return menuKey;
          }
        }
      }

      // 对于其他路径，直接返回（假设它们在侧边栏中存在）
      return path;
    };
  }, [hiddenRouteToMenuMap]);

  useEffect(() => {
    const pathname = location.pathname;
    const currentPath = pathname.replace("/index/", "");

    // 找到对应的侧边栏菜单项
    const selectedKey = findSelectedMenuKey(currentPath);
    setSelectedKeys([selectedKey]);

    // 获取父级路径作为openKeys
    const parentKeys = getParentPathKeys(currentPath);
    setOpenKeys((prevOpenKeys) => {
      // 保持已经打开的菜单和当前路径的父级菜单都处于打开状态
      const newOpenKeys = [...new Set([...prevOpenKeys, ...parentKeys])];
      return newOpenKeys;
    });
  }, [location.pathname, findSelectedMenuKey]);

  const items = useMemo(
    () => [
      {
        key: "dashboard",
        icon: <SvgIcon name="dashboard" />,
        label: "首页",
      },
      ...sidebarRoutes.map((route) => ({
        ...route,
        children: route.children || undefined,
      })),
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
