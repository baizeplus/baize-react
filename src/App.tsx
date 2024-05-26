import { RouterProvider } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import useRouterStore from "@/store/router";

import "./App.css";

function App() {
  const router = useRouterStore((state) => state.router);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemSelectedBg: "#ffffff10",
            darkItemSelectedColor: "#1677ff",
            darkItemHoverBg: "#ffffff10",
          },
          Tree: {
            directoryNodeSelectedBg: "#1677ff20",
            directoryNodeSelectedColor: "#1677ff",
          },
          Table: {
            headerSplitColor: "transparent",
          },
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <AntdApp className="h-full">
          <RouterProvider router={router} />
        </AntdApp>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
