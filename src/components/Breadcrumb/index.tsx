import { FC, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import useRouterStore from "@/store/router";
import { routes } from "@/routes/routes";

interface RouteInfo {
  title: string;
  path: string;
  parentPath?: string;
  name?: string;
  parentName?: string;
}

const Breadcrumb: FC = () => {
  const location = useLocation();
  const { sidebarRoutes, routesConfig } = useRouterStore();

  // 构建完整的路由映射表，包含隐藏路由
  const routeMap = useMemo(() => {
    const map = new Map<string, RouteInfo>();

    // 添加首页
    map.set("dashboard", { title: "首页", path: "/index/dashboard" });

    // 添加用户相关页面
    map.set("user", { title: "用户", path: "/index/user" });
    map.set("user/profile", { title: "个人中心", path: "/index/user/profile" });

    // 递归构建可见路由映射
    const buildRouteMap = (routes: any[], parentPath?: string) => {
      routes.forEach((route: any) => {
        map.set(route.key, {
          title: route.meta?.title || route.label,
          path: `/index/${route.key}`,
          parentPath,
          name: route.name,
        });

        if (route.children) {
          buildRouteMap(route.children, route.key);
        }
      });
    };

    // 从原始路由配置构建隐藏路由映射
    const buildHiddenRouteMap = () => {
      // 处理所有路由配置，包括隐藏的
      routes.forEach((route: any) => {
        // 构建路由键
        let routeKey = route.path;

        // 处理动态路由
        if (route.path.includes(":")) {
          routeKey = route.path.replace(/:\w+/g, "*");
        }

        // 构建正确的路由键
        if (route.parentName === "System") {
          // 如果路径以 / 开头，先去掉斜杠
          const cleanPath = routeKey.startsWith("/")
            ? routeKey.substring(1)
            : routeKey;
          routeKey = `system/${cleanPath}`;
        } else if (route.parentName === "Monitor") {
          // 如果路径以 / 开头，先去掉斜杠
          const cleanPath = routeKey.startsWith("/")
            ? routeKey.substring(1)
            : routeKey;
          routeKey = `monitor/${cleanPath}`;
        } else if (route.parentName === "Tool") {
          // 如果路径以 / 开头，先去掉斜杠
          const cleanPath = routeKey.startsWith("/")
            ? routeKey.substring(1)
            : routeKey;
          routeKey = `tool/${cleanPath}`;
        } else if (!route.parentName && route.path.startsWith("/")) {
          // 顶级路由，去掉前面的斜杠
          routeKey = route.path.substring(1);
        }

        // 添加到映射表
        map.set(routeKey, {
          title: route.meta?.title || route.label,
          path: `/index/${routeKey.replace(/\*/g, "")}`,
          parentPath: route.parentName?.toLowerCase(),
          name: route.name,
          parentName: route.parentName,
        });
      });
    };

    buildRouteMap(sidebarRoutes);
    buildHiddenRouteMap();
    return map;
  }, [sidebarRoutes, routesConfig]);

  // 根据当前路径生成面包屑
  const breadcrumbItems = useMemo(() => {
    const pathname = location.pathname;
    const currentPath = pathname.replace("/index/", "");

    // 如果是首页，只显示首页
    if (currentPath === "dashboard") {
      return [
        {
          title: (
            <Link to="/index/dashboard">
              <HomeOutlined style={{ marginRight: 4 }} />
              首页
            </Link>
          ),
        },
      ];
    }

    const items = [
      {
        title: (
          <Link to="/index/dashboard">
            <HomeOutlined style={{ marginRight: 4 }} />
            首页
          </Link>
        ),
      },
    ];

    // 查找匹配的路由
    const findMatchingRoute = (path: string) => {
      // 先尝试精确匹配
      const exactMatch = routeMap.get(path);
      if (exactMatch) return exactMatch;

      // 尝试动态路由匹配
      for (const [key, route] of routeMap.entries()) {
        if (key.includes("*")) {
          const pattern = key.replace(/\*/g, "[^/]+");
          const regex = new RegExp(`^${pattern}$`);
          if (regex.test(path)) {
            return route;
          }
        }
      }

      // 处理查询参数的情况
      const pathWithoutQuery = path.split("?")[0];
      const queryMatch = routeMap.get(pathWithoutQuery);
      if (queryMatch) return queryMatch;

      return null;
    };

    // 构建面包屑路径
    const pathSegments = currentPath.split("/").filter(Boolean);

    // 处理特殊情况：动态路由和隐藏路由
    const fullPath = pathSegments.join("/");
    let matchedRoute = findMatchingRoute(fullPath);

    // 如果没有匹配到路由，尝试更宽松的匹配
    if (!matchedRoute) {
      // 对于动态路由，尝试匹配路径模式
      for (const [key, route] of routeMap.entries()) {
        if (key.includes("*")) {
          const pattern = key.replace(/\*/g, "[^/]+");
          const regex = new RegExp(`^${pattern}$`);
          if (regex.test(fullPath)) {
            matchedRoute = route;
            break;
          }
        }
      }
    }

    if (matchedRoute) {
      // 如果找到匹配的路由，构建完整的面包屑
      const breadcrumbPath = [];

      // 查找父级路由
      if (matchedRoute.parentName) {
        const parentRoute = Array.from(routeMap.values()).find(
          (r) => r.name === matchedRoute!.parentName,
        );
        if (parentRoute) {
          breadcrumbPath.push(parentRoute);
        }
      }

      // 添加当前路由
      breadcrumbPath.push(matchedRoute);

      // 生成面包屑项
      breadcrumbPath.forEach((route, index) => {
        const isLast = index === breadcrumbPath.length - 1;
        // 检查是否为容器路由（中间层路由，如系统管理、监控管理）
        const isContainerRoute =
          route.name === "System" ||
          route.name === "Monitor" ||
          route.name === "Tool";

        items.push({
          title:
            isLast || isContainerRoute ? (
              <span>{route.title}</span>
            ) : (
              <Link to={route.path.includes("*") ? "#" : route.path}>
                {route.title}
              </Link>
            ),
        });
      });
    } else {
      // 回退到原来的逻辑
      let currentKey = "";

      pathSegments.forEach((segment, index) => {
        currentKey = currentKey ? `${currentKey}/${segment}` : segment;
        const route = routeMap.get(currentKey);

        if (route) {
          const isLast = index === pathSegments.length - 1;
          // 检查是否为容器路由（中间层路由，如系统管理、监控管理）
          const isContainerRoute =
            route.name === "System" ||
            route.name === "Monitor" ||
            route.name === "Tool";

          items.push({
            title:
              isLast || isContainerRoute ? (
                <span>{route.title}</span>
              ) : (
                <Link to={route.path}>{route.title}</Link>
              ),
          });
        }
      });
    }

    return items;
  }, [location.pathname, routeMap]);

  return <AntdBreadcrumb items={breadcrumbItems} />;
};

export default Breadcrumb;
