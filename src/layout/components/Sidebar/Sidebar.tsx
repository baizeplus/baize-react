import { FC } from "react";
import { Drawer } from "antd";
import Sider from "antd/es/layout/Sider";
import { useSize } from "ahooks";
import Logo from "./Logo";
import SideMenu from "./SideMenu";

type ISidebarProps = {
  collapsed: boolean;
  onCollapsed: (collapsed: boolean) => void;
};

const Sidebar: FC<ISidebarProps> = ({ collapsed, onCollapsed }) => {
  const size = useSize(document.querySelector("body"));

  return (
    <>
      {size && size?.width < 1024 ? (
        <Drawer
          width={collapsed ? 210 : 0}
          mask={collapsed}
          open={collapsed}
          closable={false}
          classNames={{
            body: "!p-0 bg-[#041527]",
          }}
          placement={"left"}
          onClose={() => onCollapsed(false)}
        >
          <Logo collapsed={collapsed} />
          <SideMenu />
        </Drawer>
      ) : (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="hidden lg:block"
        >
          <Logo collapsed={collapsed} />
          <SideMenu />
        </Sider>
      )}
    </>
  );
};
export default Sidebar;
