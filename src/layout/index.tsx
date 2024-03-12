import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSize } from 'ahooks';
import { Layout as AntdLayout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import Sidebar from "./components/Sidebar";


import Navbar from "./components/Navbar";

type IBaizeLayoutProps = {
  // children: ReactNode;
};

const Layout: FC<IBaizeLayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const size = useSize(document.querySelector('body'));
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if(size?.width) {
      if (size.width < 1280) setCollapsed(true);
      else {
        setCollapsed(false);
      }
    }
  }, [size]);

  return (
    <AntdLayout className="h-full overflow-x-hidden overflow-y-auto">
      <Sidebar collapsed={collapsed} />
      <AntdLayout>
        <Navbar collapsed={collapsed} onCollapsedIcon={setCollapsed}/>
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
