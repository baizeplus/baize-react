import { create } from "zustand";
import { persist } from "zustand/middleware";

// 主题模式类型
export type ThemeMode = "light" | "dark";

// 预设主题颜色
export const THEME_COLORS = {
  blue: "#1677ff", // 默认蓝色
  green: "#52c41a", // 商务绿色
  orange: "#fa8c16", // 活力橙色
  purple: "#722ed1", // 优雅紫色
  red: "#f5222d", // 经典红色
  cyan: "#13c2c2", // 青色
  pink: "#eb2f96", // 粉色
  yellow: "#fadb14", // 黄色
} as const;

export type ThemeColor = keyof typeof THEME_COLORS;

// 主题状态接口
export interface ThemeState {
  mode: ThemeMode;
  primaryColor: ThemeColor;
  customColor: string; // 自定义颜色
  useCustomColor: boolean; // 是否使用自定义颜色
}

// 主题操作接口
export interface ThemeActions {
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: ThemeColor) => void;
  setCustomColor: (color: string) => void;
  setUseCustomColor: (use: boolean) => void;
  toggleMode: () => void;
  resetTheme: () => void;
  getCurrentColor: () => string; // 获取当前使用的颜色
}

// 默认主题配置
const defaultTheme: ThemeState = {
  mode: "light",
  primaryColor: "blue",
  customColor: "#1677ff",
  useCustomColor: false,
};

// 创建主题store
export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      ...defaultTheme,

      setMode: (mode: ThemeMode) => {
        set({ mode });
        // 更新HTML根元素的class
        const root = document.documentElement;
        if (mode === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      },

      setPrimaryColor: (primaryColor: ThemeColor) => {
        set({ primaryColor, useCustomColor: false });
        // 更新CSS自定义属性
        const root = document.documentElement;
        root.style.setProperty("--primary-color", THEME_COLORS[primaryColor]);
      },

      setCustomColor: (customColor: string) => {
        set({ customColor, useCustomColor: true });
        // 更新CSS自定义属性
        const root = document.documentElement;
        root.style.setProperty("--primary-color", customColor);
      },

      setUseCustomColor: (useCustomColor: boolean) => {
        set({ useCustomColor });
        const state = get();
        const color = useCustomColor
          ? state.customColor
          : THEME_COLORS[state.primaryColor];
        const root = document.documentElement;
        root.style.setProperty("--primary-color", color);
      },

      toggleMode: () => {
        const currentMode = get().mode;
        const newMode = currentMode === "light" ? "dark" : "light";
        get().setMode(newMode);
      },

      getCurrentColor: () => {
        const state = get();
        return state.useCustomColor
          ? state.customColor
          : THEME_COLORS[state.primaryColor];
      },

      resetTheme: () => {
        set(defaultTheme);
        // 重置DOM
        const root = document.documentElement;
        root.classList.remove("dark");
        root.style.setProperty("--primary-color", THEME_COLORS.blue);
      },
    }),
    {
      name: "baize-theme-storage",
      // 初始化时应用主题
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 应用暗色模式
          const root = document.documentElement;
          if (state.mode === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
          // 应用主题色
          const color = state.useCustomColor
            ? state.customColor
            : THEME_COLORS[state.primaryColor];
          root.style.setProperty("--primary-color", color);
        }
      },
    },
  ),
);

export default useThemeStore;
