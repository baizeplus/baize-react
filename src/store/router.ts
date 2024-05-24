import { getRouters } from "@/api/router";
import { create } from "zustand";

export interface RouterConfigItem {
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

export interface RouterConfigNode extends RouterConfigItem {
  key: string;
  label: string;
  icon: string; // 从meta中平铺
}

interface RouterStoreProps {
  routesConfig: RouterConfigNode[];
}

const useRouterStore = create<RouterStoreProps>(() => ({
  routesConfig: [],
}));

export const getRouterConfig = async () => {
  const { data } = await getRouters();
  useRouterStore.setState({ routesConfig: data });
  // const sidebarRoutes = processTree(data);
  // setSidebarRoutes(sidebarRoutes);
};

export default useRouterStore;
