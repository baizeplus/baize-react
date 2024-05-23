import { useEffect, useState } from "react";
import { getRouters } from "@/api/router";

interface Node {
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
  children?: Node[];
}

interface ProcessedNode extends Node {
  key: string;
  label: string;
  icon: string; // 从meta中平铺
}

export function useRouter() {
  const [sidebarRoutes, setSidebarRoutes] = useState<ProcessedNode[]>([]);
  const getData = async () => {
    const { data } = await getRouters();
    const sidebarRoutes = processTree(data);
    setSidebarRoutes(sidebarRoutes);
  };

  useEffect(() => {
    getData();
  }, []);

  return { sidebarRoutes };
}

function processTree(nodes: Node[], parentPath: string = ""): ProcessedNode[] {
  return nodes
    .filter((item) => !item.hidden)
    .map((node): ProcessedNode => {
      delete node.alwaysShow;
      const fullPath = `${parentPath}/${node.path}`; // 拼接完整的路径
      const processedNode: ProcessedNode = {
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
