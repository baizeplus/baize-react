import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Typography,
  Space,
  Button,
  Flex,
  Divider,
  Tooltip,
  ColorPicker,
} from "antd";
import { CheckOutlined, ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import useThemeStore, { THEME_COLORS, ThemeColor } from "@/store/theme";
import type { ColorPickerProps } from "antd";

const { Title, Text } = Typography;

interface ThemeDrawerProps {
  open: boolean;
  onClose: () => void;
}

const ThemeDrawer: React.FC<ThemeDrawerProps> = ({ open, onClose }) => {
  const {
    mode,
    primaryColor,
    customColor,
    useCustomColor,
    setMode,
    setPrimaryColor,
    setCustomColor,
    resetTheme,
  } = useThemeStore();

  // 当前选择的颜色（用于onOpenChange时保存）
  const currentSelectedColor = useRef<string>(customColor);

  // 同步customColor到currentSelectedColor
  useEffect(() => {
    currentSelectedColor.current = customColor;
  }, [customColor]);

  // 处理预设颜色悬停预览
  const handlePresetColorHover = (colorValue: string) => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", colorValue);
  };

  // 处理预设颜色悬停离开
  const handlePresetColorLeave = () => {
    // 恢复当前选中的颜色
    const currentColor = useCustomColor
      ? customColor
      : THEME_COLORS[primaryColor];
    const root = document.documentElement;
    root.style.setProperty("--primary-color", currentColor);
  };

  // 主题风格选择器
  const ThemeStyleSelector = () => (
    <Space direction="vertical" size="middle" className="w-full">
      <Title level={4} className="!mb-2">
        主题风格设置
      </Title>
      <Flex gap={16}>
        {/* 亮色主题 */}
        <div
          className={`relative w-14 h-10 rounded cursor-pointer border-2 transition-all ${
            mode === "light" ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setMode("light")}
        >
          <div className="w-full h-full bg-white rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-100 rounded"></div>
          </div>
          {mode === "light" && (
            <CheckOutlined className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full text-xs" />
          )}
        </div>

        {/* 暗色主题 */}
        <div
          className={`relative w-14 h-10 rounded cursor-pointer border-2 transition-all ${
            mode === "dark" ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setMode("dark")}
        >
          <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
          </div>
          {mode === "dark" && (
            <CheckOutlined className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full text-xs" />
          )}
        </div>
      </Flex>
    </Space>
  );

  // 颜色变化处理（只保存颜色，不设置CSS）
  const handleColorChange: ColorPickerProps["onChange"] = (color: any) => {
    const colorHex = color.toHexString();
    currentSelectedColor.current = colorHex;
    // 不在选择过程中设置CSS，避免抖动
  };

  // 处理ColorPicker开关状态
  const handleColorPickerOpenChange = (open: boolean) => {
    if (!open) {
      // 立即应用最终颜色（不使用防抖）
      const root = document.documentElement;
      root.style.setProperty("--primary-color", currentSelectedColor.current);

      // 更新全局状态
      setCustomColor(currentSelectedColor.current);
    }
  };

  // 主题颜色选择器
  const ThemeColorSelector = () => (
    <Space direction="vertical" size="middle" className="w-full">
      <Title level={4} className="!mb-2">
        主题颜色
      </Title>

      {/* 预设颜色 */}
      <Flex wrap gap={12}>
        {Object.entries(THEME_COLORS).map(([colorKey, colorValue]) => (
          <div
            className={`relative w-8 h-8 rounded cursor-pointer border-2 transition-all hover:scale-105 ${
              primaryColor === colorKey && !useCustomColor
                ? "border-gray-400 scale-110"
                : "border-transparent"
            }`}
            style={{ backgroundColor: colorValue }}
            onMouseEnter={() => handlePresetColorHover(colorValue)}
            onMouseLeave={handlePresetColorLeave}
            onClick={() => setPrimaryColor(colorKey as ThemeColor)}
          >
            {primaryColor === colorKey && !useCustomColor && (
              <CheckOutlined className="absolute inset-0 flex items-center justify-center text-white text-sm" />
            )}
          </div>
        ))}
      </Flex>

      {/* 自定义颜色选择器 */}
      <Flex align="center" gap={12} className="mt-4">
        <Text>自定义颜色：</Text>
        <ColorPicker
          defaultValue={customColor}
          onChange={handleColorChange}
          onOpenChange={handleColorPickerOpenChange}
          showText
          disabledAlpha
          size="small"
          style={{ width: "120px" }}
        />
        {useCustomColor && <CheckOutlined className="text-green-500" />}
      </Flex>

      {/* 使用提示 */}
      <div className="text-xs text-gray-400 mt-2">
        💡 预设颜色：悬停预览，点击选择 | 自定义颜色：选择后关闭面板应用
      </div>
    </Space>
  );

  return (
    <Drawer
      title="主题设置"
      placement="right"
      width={320}
      open={open}
      onClose={onClose}
    >
      <Space direction="vertical" size="large" className="w-full">
        <ThemeStyleSelector />

        <Divider />

        <ThemeColorSelector />

        <Divider />

        <Flex gap={12}>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={onClose}
            className="flex-1"
          >
            保存配置
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={resetTheme}
            className="flex-1"
          >
            重置配置
          </Button>
        </Flex>
      </Space>
    </Drawer>
  );
};

export default ThemeDrawer;
