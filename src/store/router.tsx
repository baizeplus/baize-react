import { FC, lazy, ReactElement, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { create } from "zustand";
import { Spin } from "antd";

import { getRouters } from "@/api/router";
import Page404 from "@/pages/error/404";
import { constantRoutes } from "@/routes";
import SvgIcon from "@/components/SvgIcon";

const modules = import.meta.glob(
  [
    "@/pages/**/*.tsx",
    "!@/pages/**/components/**/*.tsx",
    "!@/pages/login",
    "!@/pages/error",
    "!@/pages/home",
  ],
  { eager: true },
);

interface RouterConfigItem {
  name: string;
  path: string;
  hidden?: boolean;
  redirect?: string;
  component?: string;
  alwaysShow?: boolean;
  meta: {
    title: string;
    icon: string;
    noCache?: boolean;
  };
  children?: RouterConfigItem[];
}

interface RouterConfigNode extends RouterConfigItem {
  key: string;
  label: string;
  icon: ReactElement; // 从meta中平铺
}

interface RouterStoreProps {
  routesConfig: RouterConfigNode[];
  sidebarRoutes: RouterConfigNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any;
}

const useRouterStore = create<RouterStoreProps>(() => ({
  routesConfig: [],
  sidebarRoutes: [],
  router: createBrowserRouter(constantRoutes),
}));

// eslint-disable-next-line react-refresh/only-export-components
export const getRouterConfig = async () => {
  const { data } = await getRouters();
  useRouterStore.setState({ routesConfig: data });
  const sidebarRoutes = processTree(data);
  useRouterStore.setState({ sidebarRoutes });
  const _router = generateDynamicRoutes(data);
  const newConstantRoutes = constantRoutes;
  newConstantRoutes[1].children = [
    ...(newConstantRoutes[1].children as RouteObject[]),
    ..._router,
  ];
  const newRouter = createBrowserRouter(newConstantRoutes) as RouteObject;
  useRouterStore.setState({ router: newRouter });
};

function processTree(
  nodes: RouterConfigItem[],
  parentPath: string = "",
): RouterConfigNode[] {
  return nodes
    .filter((item) => !item.hidden)
    .map((node): RouterConfigNode => {
      delete node.alwaysShow;
      const fullPath = `${parentPath}/${node.path}`; // 拼接完整的路径
      const processedNode: RouterConfigNode = {
        ...node,
        name: String(node.name).toLocaleLowerCase(),
        key: parentPath
          ? fullPath.replace(/^\/|\/$/, "")
          : String(node.name).toLocaleLowerCase(), // 设置key
        label: node.meta.title, // 设置label，从meta中的title获取
        icon: <SvgIcon name={node.meta.icon} />, // node.meta.icon, // 从meta中平铺icon
        children: node.children
          ? processTree(node.children, fullPath.replace("/", ""))
          : undefined, // 递归处理子节点
      };
      return processedNode;
    });
}

// eslint-disable-next-line react-refresh/only-export-components
const WFC = (WrappedComponent: FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense>
      <WrappedComponent {...props} />
    </Suspense>
  );
};
// 动态生成路由配置的函数
function generateDynamicRoutes(nodes: RouterConfigItem[]): RouteObject[] {
  return nodes.map((node) => {
    const route: RouteObject = {
      path: node?.path?.replace(/^\/|\/$/, ""),
      element: <Spin />, // 初始加载组件的占位元素
    };

    // 如果有子节点，递归添加子路由
    if (node?.children) {
      route.children = generateDynamicRoutes(node.children);
    }
    // 如果有component属性，设置loader属性来动态加载组件
    if (node?.component) {
      if (node.component === "Layout" || node.component === "ParentView") {
        route.element = <Outlet />;
      } else {
        if (loadView(node?.component)) {
          const Component = WFC(
            lazy(async () => loadView(node?.component)?.()),
          );
          route.element = <Component />;
        } else {
          route.element = <Page404 />;
        }
      }
    }
    return route;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadView = (view?: string): any => {
  let res;
  for (const path in modules) {
    const dir = path?.split("pages/")[1].split(".tsx")[0];
    if (dir === view) {
      res = () => modules[path];
    }
  }
  return res;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useRouterStore;
