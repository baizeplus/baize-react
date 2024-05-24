import { FC, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSize } from "ahooks";
import { Layout as AntdLayout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Sidebar from "./components/Sidebar/Sidebar";

import Navbar from "./components/Navbar";
import useRouterStore, { getRouterConfig } from "@/store/router";
import { getUserInfo } from "@/store/user";

type IBaizeLayoutProps = {
  // children: ReactNode;
};

const Layout: FC<IBaizeLayoutProps> = () => {
  const location = useLocation();
  const routesConfig = useRouterStore((state) => state.routesConfig);
  const [collapsed, setCollapsed] = useState(false);
  const size = useSize(document.querySelector("body"));
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // if(!routesConfig.length && location.pathname.includes('index')) {
    getUserInfo();
    getRouterConfig();
    // }
  }, []);

  useEffect(() => {
    if (size?.width) {
      if (size.width < 1280 && size.width > 1024) {
        setCollapsed(() => true);
        return;
      }

      if (size.width < 1024) {
        setCollapsed(() => false);
        return;
      } else {
        setCollapsed(false);
      }
    }
  }, [size]);

  return (
    <AntdLayout className="h-full overflow-x-hidden overflow-y-auto">
      <Sidebar collapsed={collapsed} onCollapsed={setCollapsed} />
      <AntdLayout>
        <Navbar collapsed={collapsed} onCollapsedIcon={setCollapsed} />
        <Content
          className="h-full overflow-x-hidden overflow-y-auto"
          style={{
            padding: 8,
            marginBottom: 8,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
