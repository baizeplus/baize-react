import { RouterProvider } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import "./App.css";
import router, { constantRoutes } from "./routes";
import { getRouters } from "./api/router";

function App() {
  // const getRouter = async () => {
  //   const { data } = await getRouters();
  //   const route = data.map(item => ({
  //     path: item.path,
  //     element: item.component,
  //   }))
  // };

  // getRouter();
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
          <RouterProvider router={constantRoutes} />
        </AntdApp>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
