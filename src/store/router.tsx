import { lazy, ReactElement, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { create } from "zustand";
import { Spin } from "antd";

import { constantRoutes } from "@/routes";
import { routes } from "@/routes/routes";
import SvgIcon from "@/components/SvgIcon";
import useUserStore from "./user";

// 使用更通用的类型定义
type ComponentLoader = () => Promise<{ default: React.ComponentType }>;

interface RouterConfigItem {
  name: string;
  path: string;
  hidden?: boolean;
  redirect?: string;
  component?: ComponentLoader | string;
  alwaysShow?: boolean;
  permissions?: string[];
  parentName?: string;
  parentMenuKey?: string; // 指定隐藏路由对应的侧边栏菜单项
  meta: {
    title: string;
    icon: string;
    noCache?: boolean;
  };
  children?: RouterConfigItem[];
}

interface RouterConfigNode extends Omit<RouterConfigItem, "children"> {
  key: string;
  label: string;
  icon: ReactElement;
  children?: RouterConfigNode[];
}

interface RouterStoreProps {
  routesConfig: RouterConfigNode[];
  sidebarRoutes: RouterConfigNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any; // 使用any以避免类型问题
  isInitialized: boolean; // 标记路由是否已初始化
}

const useRouterStore = create<RouterStoreProps>(() => ({
  routesConfig: [],
  sidebarRoutes: [],
  router: createBrowserRouter(constantRoutes),
  isInitialized: false,
}));

// 检查用户是否有权限访问路由
const hasAuth = (route: RouterConfigItem): boolean => {
  const { permissions: userPermissions = [] } = useUserStore.getState();

  if (!route.permissions || route.permissions.length === 0) {
    return true;
  }

  return route.permissions.some((permission) =>
    userPermissions.includes(permission),
  );
};

// 根据权限过滤路由
const filterRoutesByAuth = (routes: RouterConfigItem[]): RouterConfigItem[] => {
  return routes.filter((route) => hasAuth(route));
};

// 将扁平的权限路由转换为树形结构
const buildRoutesTree = (): RouterConfigItem[] => {
  // 合并所有路由
  const allRoutes = [...routes] as RouterConfigItem[];

  // 过滤出用户有权限的路由
  const filteredRoutes = filterRoutesByAuth(allRoutes);

  // 用于存储最终的路由树
  const routesTree: RouterConfigItem[] = [];

  // 创建一个Map用于快速查找路由
  const routeMap = new Map<string, RouterConfigItem>();

  // 初始化顶级路由(父菜单)
  filteredRoutes
    .filter((route) => !route.parentName)
    .forEach((route) => {
      const newRoute = { ...route, children: [] };
      routesTree.push(newRoute);
      routeMap.set(route.name, newRoute);
    });

  // 将子路由添加到对应的父路由
  filteredRoutes
    .filter((route) => route.parentName)
    .forEach((route) => {
      // 找到直接父级
      const parent = routeMap.get(route.parentName || "");

      if (parent && parent.children) {
        // 如果是二级菜单，直接添加到父级
        parent.children.push(route);
      } else {
        // 检查是否为三级或更深的菜单
        // 查找父级的父级
        for (const topRoute of routesTree) {
          const findParentInChildren = (
            children: RouterConfigItem[],
          ): boolean => {
            for (const child of children) {
              if (child.name === route.parentName) {
                if (!child.children) {
                  child.children = [];
                }
                child.children.push(route);
                return true;
              }

              if (child.children && findParentInChildren(child.children)) {
                return true;
              }
            }
            return false;
          };

          if (topRoute.children && findParentInChildren(topRoute.children)) {
            // 找到并添加到父级了
            break;
          }
        }
      }
    });

  return routesTree;
};

// 处理菜单显示
function processMenuTree(
  nodes: RouterConfigItem[],
  parentPath: string = "",
): RouterConfigNode[] {
  return nodes
    .filter((item) => !item.hidden)
    .map((node) => {
      // 构建完整路径
      const fullPath = parentPath
        ? `${parentPath}/${node.path}`.replace(/\/+/g, "/")
        : node.path;

      // 创建菜单节点，过滤掉parentName和parentMenuKey属性避免React警告
      // 通过显式指定要保留的属性来避免lint警告
      const {
        name,
        path,
        hidden,
        redirect,
        component,
        permissions,
        meta,
        children,
      } = node;

      const menuNode: RouterConfigNode = {
        name: String(name).toLowerCase(),
        path,
        hidden,
        redirect,
        component,
        permissions,
        meta,
        key: fullPath.replace(/^\/|\/$/, ""),
        label: meta.title,
        icon: <SvgIcon name={meta.icon} />,
        children:
          children && children.length > 0
            ? processMenuTree(children, fullPath)
            : undefined,
      };

      return menuNode;
    });
}

// 将路由配置转换为React Router的RouteObject
function generateRoutes(routes: RouterConfigItem[]): RouteObject[] {
  // 存储所有路由（扁平结构）
  const result: RouteObject[] = [];

  // 递归处理路由树，将所有路由扁平化处理
  const flattenRoutes = (items: RouterConfigItem[], parentPath = "") => {
    items.forEach((route) => {
      // 构建完整路径
      const fullPath = parentPath
        ? `${parentPath}/${route.path}`
            .replace(/\/+/g, "/")
            .replace(/^\/|\/$/, "")
        : route.path.replace(/^\/|\/$/, "");

      // 判断是否为纯容器菜单（有子路由但自身不应生成路由的菜单）
      const isPureContainer =
        route.children?.length &&
        // "日志管理"的组件是Layout或类似容器组件
        (!route.component ||
          (typeof route.component === "string" &&
            (route.component === "Layout" ||
              route.component === "ParentView")) ||
          // 特殊处理: Log节点是有component的但应该只作为容器
          route.name === "Log");

      // 如果是纯容器，不生成路由，只处理子路由
      if (isPureContainer) {
        if (route.children) {
          // 直接递归处理子路由，使用当前路径作为父路径
          flattenRoutes(route.children, fullPath);
        }
        return;
      }

      // 如果有组件，创建路由对象
      if (route.component) {
        const routeObject: RouteObject = {
          path: fullPath,
        };

        // 处理组件
        if (typeof route.component === "string") {
          if (
            route.component === "Layout" ||
            route.component === "ParentView"
          ) {
            routeObject.element = <Outlet />;
          }
        } else {
          // 如果component是函数类型
          const LazyComponent = lazy(route.component);
          routeObject.element = (
            <Suspense fallback={<Spin />}>
              <LazyComponent />
            </Suspense>
          );
        }

        result.push(routeObject);
      }

      // 递归处理子路由
      if (route.children && route.children.length > 0) {
        flattenRoutes(route.children, fullPath);
      }
    });
  };

  // 处理路由树
  flattenRoutes(routes);

  return result;
}

// 初始化路由配置
export const getRouterConfig = async (): Promise<void> => {
  const { isInitialized } = useRouterStore.getState();

  // 如果已经初始化过，则不再重复初始化
  if (isInitialized) {
    return;
  }

  // 构建路由树
  const routesTree = buildRoutesTree();

  // 设置路由配置和侧边栏菜单（用于显示）
  useRouterStore.setState({
    routesConfig: routesTree as RouterConfigNode[],
    sidebarRoutes: processMenuTree(routesTree),
  });

  // 生成扁平化的路由对象
  const generatedRoutes = generateRoutes(routesTree);

  // 将动态路由添加到constantRoutes
  const newConstantRoutes = [...constantRoutes];

  // 确保Layout存在且有children，然后添加生成的路由
  if (newConstantRoutes[1]?.children) {
    const layoutChildren = newConstantRoutes[1].children as RouteObject[];

    // 过滤掉catch-all路由("*")，之后再添加回来
    const catchAllRoute = layoutChildren.find((route) => route.path === "*");
    const defaultRoutes = layoutChildren.filter(
      (route) => !["*", ""].includes(route.path || ""),
    );

    // 设置新的children: 固定路由 + 动态生成的扁平路由 + 通配符路由
    newConstantRoutes[1].children = [
      ...defaultRoutes,
      ...generatedRoutes,
      ...(catchAllRoute ? [catchAllRoute] : []),
    ];
  }

  // 创建新的路由器
  const newRouter = createBrowserRouter(newConstantRoutes);
  useRouterStore.setState({
    router: newRouter,
    isInitialized: true,
  });
};

export default useRouterStore;
