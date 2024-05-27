import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import useRouterStore from "@/store/router";
import SvgIcon from "@/components/SvgIcon";

const SideMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const sidebarRoutes = useRouterStore((state) => state.sidebarRoutes);

  useEffect(() => {
    const pathname = location.pathname;
    setSelectedKeys([pathname.replace("/index/", "")]);
    setOpenKeys(pathname.split("/"));
  }, [location.pathname, navigate]);

  const items = useMemo(
    () => [
      {
        key: "dashboard",
        icon: <SvgIcon name="dashboard" />,
        label: "首页",
      },
      ...sidebarRoutes,
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
