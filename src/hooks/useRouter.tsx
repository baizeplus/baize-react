import { Suspense, useCallback, useEffect, useState } from "react";
import { RouterConfigItem, RouterConfigNode } from "@/store/router";
import { constantRoutes } from "@/routes";
import useRouterStore from "@/store/router";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Spin } from "antd";
import { Dashboard } from "@/routes/routes";

export function useRouter() {
  const routesConfig = useRouterStore((state) => state.routesConfig);
  const [sidebarRoutes, setSidebarRoutes] = useState<RouterConfigNode[]>([]);
  const [router, setRouter] = useState<RouteObject>(
    createBrowserRouter(constantRoutes),
  );

  const handleSidebarRoutes = useCallback(() => {
    const sidebarRoutes = processTree(routesConfig);
    setSidebarRoutes(sidebarRoutes);
  }, [routesConfig]);

  const handleDynamicRoutes = useCallback(() => {
    if (routesConfig) {
      console.log();
      const _router = generateDynamicRoutes(
        JSON.parse(JSON.stringify(routesConfig)),
      );
      if (_router.length) {
        const newConstantRoutes = constantRoutes;
        console.log("childre");
        newConstantRoutes[1].children = [
          ...newConstantRoutes[1].children,
          ..._router,
        ];
        console.log("newConstantRoutes", newConstantRoutes);
        // setRouter(createBrowserRouter(constantRoutes))
        setRouter(createBrowserRouter(newConstantRoutes));
      }
    }
  }, [routesConfig]);

  useEffect(() => {
    handleDynamicRoutes();
  }, [handleDynamicRoutes]);

  useEffect(() => {
    handleSidebarRoutes();
  }, [handleSidebarRoutes]);

  // useEffect(() => {
  //   handleDynamicRoutes();
  // }, [handleDynamicRoutes]);

  return { router, sidebarRoutes };
}

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
        icon: "", // node.meta.icon, // 从meta中平铺icon
        children: node.children
          ? processTree(node.children, fullPath.replace("/", ""))
          : undefined, // 递归处理子节点
      };
      return processedNode;
    });
}

// 动态生成路由配置的函数
function generateDynamicRoutes(nodes: RouterConfigItem[]): RouteObject[] {
  return nodes.map((node) => {
    const route: RouteObject = {
      path: node?.path?.replace(/^\/|\/$/, ""),
      element: <Spin />, // 初始加载组件的占位元素
      // 可以根据需要添加其他路由配置，如meta信息等
    };

    // 如果有子节点，递归添加子路由
    if (node.children) {
      route.children = generateDynamicRoutes(node.children);
    }
    // 如果有component属性，设置loader属性来动态加载组件
    // if (node.component) {
    //   route.loader = async () => {
    //     console.log('node.component')
    //     const { default: Component } = await import(`./${node.component}`);
    //     return Component;
    //   };
    // }
    return route;
  });
}
