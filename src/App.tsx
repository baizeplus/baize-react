import { RouterProvider } from "react-router-dom";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import useRouterStore from "@/store/router";
import useThemeStore from "@/store/theme";

import "./App.css";

function App() {
  const router = useRouterStore((state) => state.router);
  const { mode, getCurrentColor } = useThemeStore();

  // 获取主题配置
  const currentColor = getCurrentColor();
  const themeConfig = {
    algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: currentColor,
    },
    components: {
      Menu: {
        darkItemSelectedBg: "#ffffff10",
        darkItemSelectedColor: currentColor,
        darkItemHoverBg: "#ffffff10",
      },
      Tree: {
        directoryNodeSelectedBg: `${currentColor}20`,
        directoryNodeSelectedColor: currentColor,
      },
      Table: {
        headerSplitColor: "transparent",
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <StyleProvider hashPriority="high">
        <AntdApp className="h-full">
          <RouterProvider router={router} />
        </AntdApp>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
