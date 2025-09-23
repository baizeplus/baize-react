/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 启用class模式的暗色主题
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      colors: {
        primary: "var(--primary-color, #1677ff)",
        // 暗色模式颜色
        dark: {
          bg: "#141414",
          card: "#1f1f1f",
          border: "#303030",
        },
      },
      backgroundColor: {
        "dark-primary": "#141414",
        "dark-secondary": "#1f1f1f",
      },
      borderColor: {
        "dark-primary": "#303030",
      },
      textColor: {
        "dark-primary": "#ffffff",
        "dark-secondary": "#ffffff85",
      },
    },
  },
  plugins: [],
};
